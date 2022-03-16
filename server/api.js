import { Router } from "express";

import pool from "./db";

const router = Router();

router.get("/tasks", (req, res) => {
	pool
		.query("SELECT * FROM tasks ")
		.then((result) => res.send(result.rows))
		.catch((err) => console.log(err));
});

// Edit a task
router.put("/tasks/:id", (req, res) => {
	const ID = req.params.id;
	const status = req.body.status_title;
	const date = req.body;
	const evidence = req.body.evidence;

	pool
		.query("SELECT status_id FROM status WHERE status_title = $1", [status])
		.then((result) => {
			const newStatusId = result.rows[0].status_id;
			console.log(newStatusId);
			return pool
				.query("SELECT * FROM tasks WHERE task_id= $1", [ID])
				.then((result) => {
					const originalValues = result.rows[0];
					console.log(originalValues);

					return pool
						.query(
							"UPDATE tasks SET due_date=$1,status_id =$2,evidence = $3 WHERE task_id=$4",
							[
								originalValues.due_date || date,
								originalValues.status_id || newStatusId,
								originalValues.evidence || evidence,
								ID,
							]
						)
						.then((result) => res.send(result))
						.catch((error) => {
							console.error(error);
							res.status(500).json(error);
						});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json(error);
				});
		});
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
			return res.send({ message: "user already existed" });
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

router.post("/tasks", (req, res) => {
	const { taskTitle, userEmail, dueDate, evidence, elementId, statusId } =
		req.body;
	if (!userEmail) {
		res.status(404).send({ message: "User email can not be empty " });
	}
	if (!taskTitle) {
		res.status(404).send({ message: "Task title can not be empty " });
	}

	if (!statusId) {
		res.status(404).send({ message: "Status Id can not be empty " });
	}

	if (!elementId) {
		res.status(404).send({ message: "Element Id can not be empty " });
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

export default router;
