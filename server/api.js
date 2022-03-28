import { Router } from "express";

const bcrypt = require("bcrypt");
const saltRounds = 10;

import pool from "./db";

const router = Router();

// ///////////////////// AUTHORIZATION /////////////////////////////////////

router.post("/register", (req, res) => {
	const { user_email, password } = req.body;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}

		pool
			.query(
				"INSERT INTO users (user_email, mentor_access, password) VALUES ($1,$2,$3)",
				[user_email, false, hash]
			)
			.then(() => res.send("User inserted successfully"));
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

	pool
		.query("SELECT * FROM users WHERE user_email = $1;", [user_email])
		.then((result) => {
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
		})
		.catch((err) => console.log(err));
});

// ///////////////////////////// TASKS TABLE///////////////////////////////

// Edit a Graduate's task
// UPDATE/PUT /api/users/:userEmail/elements/:elementId/tasks/:taskId
router.put(
	"/users/:userEmail/elements/:elementId/tasks/:taskId",
	(req, res) => {
		// destructuring the email, elementId and taskId from request params, to be used to match to the particular task we want to edit
		const { userEmail, elementId, taskId } = req.params;

		// we then destructure the task title, statusId, date and evidence from the request body, to use their values to update (edit) a specific graduate's task
		const { taskTitle, statusId, date, evidence } = req.body;

		// making sure that the we have the params before we do anything
		if (userEmail.length > 0 && elementId.length > 0 && taskId.length > 0) {
			// In case all 3 params are provided, we need to check that a task indeed exists with these params (same graduate email, elementId and taskId)
			pool
				.query(
					"SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id= $3",
					[userEmail, elementId, taskId]
				)
				.then((result) => {
					// saving the current task which we want to edit in a const
					const originalValues = result.rows[0];

					// updating the task in question by checking if any value was provided in the request body for the specific field, else, we are keeping the one in the original values, not to lose any data the graduate did not want to edit
					return pool
						.query(
							"UPDATE tasks SET task_title=$1, due_date=$2, status_id =$3,evidence = $4 WHERE tasks.element_id=$5 AND task_id=$6",
							[
								taskTitle || originalValues.task_title,
								date || originalValues.due_date,
								statusId || originalValues.status_id,
								evidence || originalValues.evidence,
								elementId,
								taskId,
							]
						)
						.then(() =>
							res.send({ success: true, message: "updated successfully" })
						)
						.catch((error) => {
							console.error(error);
							res.status(500).json(error);
						});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json(error);
				});
		} else {
			// if any of the params were not provided we are returning back a 400 request error
			res.status(400).send({ success: false, message: "something is wrong" });
		}
	}
);

//Delete a Graduate's task
// DELETE /api/users/:userEmail/elements/:elementId/tasks/:taskId
router.delete(
	"/users/:userEmail/elements/:elementId/tasks/:taskId",
	async (req, res) => {
		// destructuring the email, elementId and taskId from request params, to be used to match to the particular task we want to delete
		const { userEmail, elementId, taskId } = req.params;

		// making sure that the we have the params before we do anything
		if (userEmail.length > 0 && elementId.length > 0 && taskId.length > 0) {
			try {
				// querying for the requested task to be deleted, saving result of query in variable
				const selectQuery =
					"SELECT task_id FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id =$3";
				let selectResult = await pool.query(selectQuery, [
					userEmail,
					elementId,
					taskId,
				]);

				// if there were no returned results in the select query, it means there is not task to be deleted with the provided params for this graduate
				// this was added in case there were any requests from postman or other similar apps, as from the front-end, the graduate cannot delete a task they do not have
				if (selectResult.rows.length === 0) {
					return res.status(404).send("Not found.");
				} else {
					// else we do have a task to be deleted, thus we run the delete query, passing in the specific task's params
					await pool.query(
						"DELETE  FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id =$3",
						[userEmail, elementId, taskId]
					);

					// After deletion, we are selecting all the remaining tasks under the specific element of the graduate
					const data =
						"SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2";
					await pool.query(data, [userEmail, elementId]).then((result) => {
						// In case the graduate has any remaining tasks, we are displaying them back to them, by sending them back
						if (result.rows.length > 0) {
							return res.send(result.rows);
						} else {
							// else, we conclude that the graduate deleted their last task in the specified Element and we return back this detail to the graduate
							return res.send({
								success: true,
								message:
									"it appears you have no tasks under this particular element, why not add some!",
							});
						}
					});
				}
			} catch (error) {
				console.error(error);
				res.status(500).send(error);
			}
		} else {
			// if any of the params were not provided we are returning back a 400 request error
			return res.status(400).send({
				success: false,
				message: "Something went wrong while deleting your task",
			});
		}
	}
);

//Get all the tasks for a Graduate's element
// GET /api/users/:userEmail/elements/:elementId/tasks
router.get("/users/:userEmail/elements/:elementId/tasks", (req, res) => {
	// destructuring the userEmail and element Id to use them to get all the tasks for the graduate under a specific element
	const { userEmail, elementId } = req.params;

	// if the params where provided, then we go ahead
	if (userEmail.length > 0 && elementId.length > 0) {
		try {
			// querying for the requested tasks in the specified element for the graduate
			pool
				.query("SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2", [
					userEmail,
					elementId,
				])
				.then((result) => {
					// if the graduate has any tasks in the specified element, we are returning them back
					if (result.rows.length > 0) {
						return res.send(result.rows);
					} else {
						// else we are concluding that the user has no tasks in the specified element and we share this information with them
						return res.send({
							success: true,
							message:
								"it appears you have no tasks in this element, why not add some!",
						});
					}
				})
				.catch((error) => {
					console.error(error);
					console.log(userEmail);
					return res.status(500).json(error);
				});
		} catch (error) {
			console.error(error);
			res.status(500).send(error);
		}
	} else {
		// if any of the params were not provided we are returning back a 400 request error
		return res.status(400).send({
			success: false,
			message: "Something went wrong while getting your tasks for this Element",
		});
	}
});

// // Graduate's tasks per element with status title and element title => inner join per element for Graduate
// Will use this to quickly display task details in front end when mapping tasks
// GET /api/users/:userEmail/elements/:elementId/tasks
router.get(
	"/users/:userEmail/elements/:elementId/detailedTasks",
	async (req, res) => {
		const { userEmail, elementId } = req.params;

		if (userEmail.length > 0 && elementId.length > 0) {
			try {
				// querying for the requested tasks details in the specified element for the graduate
				const Query =
					"SELECT task_title , due_date, evidence, element_title, status_title FROM tasks INNER JOIN elements ON tasks.element_id = elements.element_id INNER JOIN status ON tasks.status_id = status.status_id WHERE user_email = $1 AND elements.element_id=$2";
				const result = await pool.query(Query, [userEmail, elementId]);

				if (result.rows.length > 0) {
					return res.send(result.rows);
				} else {
					// else we are concluding that the user has no tasks in the specified element and we share this information with them
					return res.send({
						success: true,
						message:
							"it appears you have no tasks in this element, why not add some!",
					});
				}
			} catch (error) {
				console.error(error);
				res.status(500).send(error);
			}
		} else {
			// if any of the params were not provided we are returning back a 400 request error
			return res.status(400).send({
				success: false,
				message:
					"Something went wrong while getting the details for your tasks under this Element",
			});
		}
	}
);

//Add a task under a particular element for a particular Graduate
// POST /api/users/:userEmail/elements/:elementId/tasks
router.post("/users/:userEmail/elements/:elementId/tasks", (req, res) => {
	// destructuring task information to be added from the request body
	const { taskTitle, dueDate, evidence, statusId } = req.body;

	// destructuring the required parameters to post a new task under a particular element for the graduate
	const { userEmail, elementId } = req.params;

	// checking that the required parameters are provided before we carry on
	if (userEmail.length > 0 && elementId.length > 0) {
		// checking if any of the non-null fields in the tasks table is not provided
		if (!taskTitle || !statusId) {
			return res.status(400).send({
				message:
					"Task Title and Status cannot be empty, please edit and try again :D ",
			});
		} else {
			// if the previous check clears, the else statement kicks in inserting a new task under the specified element for the graduate
			// after inserting the new task, we are doing another query to display back all the tasks under a particular element for the graduate
			return pool
				.query(
					"INSERT INTO tasks (task_title, user_email,due_date, evidence,element_id, status_id) VALUES ($1,$2,$3,$4,$5,$6)",
					[taskTitle, userEmail, dueDate, evidence, elementId, statusId]
				)
				.then(() =>
					pool
						.query("SELECT * FROM tasks WHERE user_email=$1", [userEmail])
						.then((result) => res.send(result.rows))
						.catch((err) => console.log(err))
				)
				.catch((err) => console.log(err));
		}
	} else {
		// if any of the required parameters was not provided, we are returning an error message with a bad request status 400
		return res.status(400).send({
			success: false,
			message:
				"Something went wrong while trying to add this task under the specified element, please refresh and try again",
		});
	}
});

// ////////////////// USERS TABLE/////////////////////////

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

//Add a graduate as a mentor
router.put("/users/mentors/:mentor", async (req, res) => {
	try {
		const params = req.params.mentor;
		const graduate = req.body.graduate;
		const Query =
			"SELECT * FROM users WHERE graduate_1 IN ($1) OR graduate_2 IN ($1) OR graduate_3 IN ($1)AND user_email=$2;";
		const result = await pool.query(Query, [graduate, params]);
		if (result.rows.length === 0) {
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
		} else {
			res.send("graduate is already added");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//remove a graduate from mentor

router.put("/users/mentors/:mentor/:graduate", async (req, res) => {
	try {
		const mentor = req.params.mentor;
		const graduate = req.params.graduate;
		const Query =
			"SELECT * FROM users WHERE graduate_1 IN ($1) OR graduate_2 IN ($1) OR graduate_3 IN ($1)AND user_email=$2;";
		const result = await pool.query(Query, [graduate, mentor]);
		if (result.rows.length > 0) {
			const Query =
				"SELECT user_email,graduate_1, graduate_2,graduate_3 FROM users WHERE user_email =$1";
			const result = await pool.query(Query, [mentor]);
			if (result.rows[0].graduate_1 === graduate) {
				const result1 = await pool.query(
					"UPDATE users SET graduate_1=null WHERE user_email=$1",
					[mentor]
				);
				res.send(result1);
			} else if (result.rows[0].graduate_2 === graduate) {
				const result2 = await pool.query(
					"UPDATE users SET graduate_2=null WHERE user_email=$1",
					[mentor]
				);
				res.send(result2);
			} else if (result.rows[0].graduate_3 === graduate) {
				const result3 = await pool.query(
					"UPDATE users SET graduate_3=null WHERE user_email=$1",
					[mentor]
				);
				res.send(result3);
			} else {
				res.send("No connection found");
			}
		} else {
			res.send("mentor has no current connections");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//Get graduates goal
router.get("/graduates/goal/:graduate", async (req, res) => {
	try {
		const mentor = "f";
		const graduate = req.params.graduate;
		const Query = "SELECT goal FROM users WHERE mentor_access =$1 AND user_email=$2;";
		const result = await pool.query(Query, [mentor, graduate]);
		return res.send(result.rows);
	} catch (error) {
		console.error(error);
		return res.status(500).send(error);
	}
});

//PUT graduates goal

router.put("/graduates/goal/:graduate", async (req, res) => {
	try {
		const goal = req.body.goal;
		const graduate = req.params.graduate;
		console.log(graduate);
		const Query =
			"SELECT * FROM users WHERE user_email=$1;";
		const result = await pool.query(Query, [graduate]);
		if (result.rows.length > 0) {
			const result1 = await pool.query(
					"UPDATE users SET goal=$1 WHERE user_email=$2",
					[goal, graduate]
				);
				res.send(result1);
			} else {
				res.send("No graduate goal found");
			}
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//Get Comments from database
router.get("/comments/:graduate", async (req, res) => {
	try {
		const mentor = "f";
		const graduate = req.params;
		const Query = "SELECT user_email FROM comments WHERE mentor_access =$1;";
		const result = await pool.query(Query, [mentor]);
		return res.send(result.rows);
	} catch (error) {
		console.error(error);
		return res.status(500).send(error);
	}
});






//Get all graduates
router.get("/graduates", async (req, res) => {
	try {
		const mentor = "f";
		const Query = "SELECT user_email FROM users WHERE mentor_access =$1;";
		const result = await pool.query(Query, [mentor]);
		return res.send(result.rows);
	} catch (error) {
		console.error(error);
		return res.status(500).send(error);
	}
});

//get all graduates for specific mentor
router.get("/graduates/:mentor", async (req, res) => {
	try {
		const mentor = req.params.mentor;
		const Query =
			"SELECT graduate_1,graduate_2,graduate_3 FROM users WHERE user_email  =$1 ";
		const result = await pool.query(Query, [mentor]);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

// ___________________________________________________________________________________
// 						Production Routes - Testing
// ___________________________________________________________________________________
router.get("/tasks", (req, res) => {
	pool
		.query("SELECT * FROM tasks ")
		.then((result) => res.send(result.rows))
		.catch((err) => console.log(err));
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

//////posting a comment to the graduate

router.post("/comments/:graduate/elements/:element/:senderEmail", async (req, res) => {
	try {
		const { graduate, element, senderEmail } = req.params;
		const date = req.body.date;
		const comment = req.body.comment;

		const Query =
			"INSERT INTO comments (user_email,element_id, comment_content,comment_date, graduate_email) VALUES ($1,$2,$3,$4,$5)";
		const result = await pool.query(Query, [senderEmail, element, comment, date, graduate]);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

export default router;
