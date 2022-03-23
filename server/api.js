import { Router } from "express";


const bcrypt = require("bcrypt");
const saltRounds = 10;

import pool from "./db";

const router = Router();

router.post("/register", (req, res) => {
  const { user_email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    pool.query(
			"INSERT INTO users (user_email, mentor_access, password) VALUES ($1,$2,$3)",
			[user_email, false, hash]
		).then(() => res.send("User inserted successfully"));
  });
});

router.get("/login", (req, res) => {
	console.log("req.session.user has the value: ", req.session.user);
  if (req.session.user) {
    return res.send({ loggedIn: true, user: req.session.user });
  } else {
    return res.send({ loggedIn: false });
  }
});

router.post("/login", (req, res) => {
  const { user_email, password } = req.body;
  console.log("email", user_email);

  pool.query(
    "SELECT * FROM users WHERE user_email = $1;",
    [user_email]).then((result) => {
		console.log("result after querying", result);
		console.log("end of result after querying");
		if (result.rows.length > 0) {
			console.log("the password passed from req body: ", password);
			console.log("the password from the result: ", result.rows[0].password);
			bcrypt.compare(password, result.rows[0].password, (error, response) => {
				if (response) {
					console.log("comparison successfull");
					req.session.user = result.rows[0];
					console.log(req.session.user);
					res.send(result.rows[0]);
				} else {
					res.send({ message: "Wrong username/password combination!" });
				}
			});
		} else {
			res.send({ message: "User doesn't exist" });
		}
	}).catch((err) => console.log(err));
});



router.get("/tasks", (req, res) => {
	pool
		.query("SELECT * FROM tasks ")
		.then((result) => res.send(result.rows))
		.catch((err) => console.log(err));
});

// Edit a task
router.put("/tasks/:taskId", (req, res) => {

	const { taskId } = req.params;

	const { taskTitle, userEmail, dueDate, evidence, elementId, statusId } =
		req.body;
	console.log(userEmail);
	// making sure that the we have the params before we do anything
	if (taskId.length > 0) {
		pool
			.query(
				"SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id= $3",
				[userEmail, elementId, taskId]
			)
			.then((result) => {
				// saving the current task which we want to edit in a const
				const originalValues = result.rows[0];

				// updating the task in question by checking if any value was provided in the request body for the specific field, else, we are keeping the one in the original values, not to lose any data the graduate did not want to edit
				pool
					.query(
						"UPDATE tasks SET task_title=$1, due_date=$2, evidence = $3, status_id =$4 WHERE element_id=$5 AND task_id=$6",
						[
							taskTitle || originalValues.task_title,
							dueDate || originalValues.due_date,
							evidence || originalValues.evidence,
							statusId || originalValues.status_id,
							elementId,
							taskId,
						]
					)
					.then(() =>
						res.send({ success: true, message: "updated successfully" })
					);
			})
			.catch((error) => {
				console.error(error);
				return res.status(400).json(error);
			});
	} else {
		// if any of the params were not provided we are returning back a 400 request error
		return res.status(400).send({ success: false, message: "something is wrong" });
	}
});

//Get all the tasks
router.get("/tasks", (req, res) => {
	pool
		.query("SELECT * FROM tasks")
		.then((result) => res.send(result.rows))
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});

//Delete a task
router.delete("/tasks/:id", async (req, res) => {
	try {
		const Id = req.params.id;
		const selectQuery = "SELECT task_id FROM tasks WHERE task_id =$1";
		let selectResult = await pool.query(selectQuery, [Id]);
		if (selectResult.rows.length === 0) {
			return res.status(404).send("Not found.");
		} else {
			await pool.query("DELETE  FROM tasks WHERE task_id = $1", [Id]);
			const data = "SELECT * FROM tasks";
			let remainedTasks = await pool.query(data);

			return res.send(remainedTasks.rows);
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// // //Add a new user
router.post("/users", async (req, res) => {
	try {
		const userEmail = req.body.user_email;
		console.log(userEmail);
		let result = await pool.query(
			"SELECT user_email FROM users WHERE user_email = $1",
			[userEmail]
		);

		if (result.rows.length > 0) {
			let userAccess = await pool.query(
				" SELECT mentor_access FROM users WHERE user_email=$1 ",
				userEmail
			);
			return res.send({
				message: "user already existed",
				mentor_access: userAccess,
			});
		} else {
			const mentor = req.body.mentor_access;
			result = await pool.query(
				"INSERT INTO users (user_email,mentor_access) VALUES ($1,$2)",
				[userEmail, mentor]
			);
			res.send(" A user is added");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// // User's tasks

router.get("/users/:user", async (req, res) => {
	try {
		const User = req.params.user;
		const Query =
			"SELECT task_title , due_date, evidence, element_title, status_title FROM tasks INNER JOIN elements ON tasks.element_id = elements.element_id INNER JOIN status ON tasks.status_id = status.status_id WHERE user_email = $1";
		const result = await pool.query(Query, [User]);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//Add a task

router.post("/tasks", (req, res) => {
	const { taskTitle, userEmail, dueDate, evidence, elementId, statusId } =
		req.body;
	if (!userEmail) {
		res.status(400).send({ message: "User email can not be empty " });
	}
	if (!taskTitle) {
		res.status(400).send({ message: "Task title can not be empty " });
	}

	if (!statusId) {
		res.status(400).send({ message: "Status Id can not be empty " });
	}

	if (!elementId) {
		res.status(400).send({ message: "Element Id can not be empty " });
	}

	pool
		.query(
			"INSERT INTO tasks (task_title, user_email,due_date, evidence,element_id, status_id) VALUES ($1,$2,$3,$4,$5,$6)",
			[taskTitle, userEmail, dueDate, evidence, elementId, statusId]
		)
		.then(() =>
			pool
				.query("SELECT * FROM tasks")
				.then((result) => res.send(result.rows))
				.catch((err) => console.log(err))
		)
		.catch((err) => console.log(err));
});

// search for a user
router.get("/users", async (req, res) => {
	try {
		const term = req.query.term;
		let params = [];
		let query = "SELECT * FROM users;";

		if (term) {
			query = "SELECT user_email FROM users WHERE user_email LIKE $1";
			params = [`%${term}%`];
		}
		// const TERM = `%${Term}%`;
		let result = await pool.query(query, params);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// All users
router.get("/users", async (req, res) => {
	try {
		const Query = "SELECT * FROM users ";
		const result = await pool.query(Query);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//Get the graduates for a mentor
router.get("/users/mentors/:mentor", async (req, res) => {
	try {
		const params = req.params.mentor;
		// const mentor = "t";
		const Query =
			"SELECT user_email,graduate_1, graduate_2,graduate_3 FROM users WHERE user_email =$1;";
		const result = await pool.query(Query, [params]);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//Add a mentee
router.put("/users/mentors/:mentor", async (req, res) => {
	try {
		const params = req.params.mentor;
		const graduate = req.body.graduate;
		// const mentor = "t";
		const Query =
			"SELECT user_email,graduate_1, graduate_2,graduate_3 FROM users WHERE user_email =$1";
		const result = await pool.query(Query, [params]);
		if (
			!result.rows[0].graduate_1 &&
			(result.rows[0].graduate_2 || !result.rows[0].graduate_2) &&
			(result.rows[0].graduate_3 || !result.rows[0].graduate_3)
		) {
			const result1 = await pool.query(
				"UPDATE users SET graduate_1=$1 WHERE user_email=$2",
				[graduate, params]
			);
			res.send(result1);
		} else if (
			result.rows[0].graduate_1 &&
			!result.rows[0].graduate_2 &&
			(!result.rows[0].graduate_3 || result.rows[0].graduate_3)
		) {
			const result2 = await pool.query(
				"UPDATE users SET graduate_2=$1 WHERE user_email=$2",
				[graduate, params]
			);
			res.send(result2);
		} else if (
			result.rows[0].graduate_1 &&
			result.rows[0].graduate_2 &&
			!result.rows[0].graduate_3
		) {
			const result3 = await pool.query(
				"UPDATE users SET graduate_3=$1 WHERE user_email=$2",
				[graduate, params]
			);
			res.send(result3);
		} else {
			res.send("all entries are full");
		}
		// console.log(result.rows[0].graduate_2);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});
//Get all graduates
router.get("/graduates", async (req, res) => {
	try {
		const mentor = "f";
		const Query = "SELECT user_email FROM users WHERE mentor_access =$1;";
		const result = await pool.query(Query, [mentor]);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

export default router;
