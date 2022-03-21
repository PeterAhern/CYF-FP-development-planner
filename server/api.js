import { Router } from "express";

import pool from "./db";

const router = Router();



// Edit a task
// UPDATE/PUT /api/users/:userEmail/elements/:elementId/tasks/:taskId
router.put(
	"/users/:userEmail/elements/:elementId/tasks/:taskId",
	(req, res) => {
		const { userEmail, elementId, taskId } = req.params;

		const { taskTitle, statusId, date, evidence } = req.body;

		if (userEmail.length > 0 && elementId.length > 0 && taskId.length > 0) {
			pool
				.query(
					"SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id= $3",
					[userEmail, elementId, taskId]
				)
				.then((result) => {
					const originalValues = result.rows[0];
					console.log(originalValues);

					return pool
						.query(
							"UPDATE tasks SET task_title=$1, due_date=$2, status_id =$3,evidence = $4 WHERE tasks.element_id=$5 AND task_id=$6",
							[
								taskTitle || originalValues.task_title ,
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
			res.status(400).send({ success: false, message: "something is wrong" });
		}
	}
);

//Delete a task
// DELETE /api/users/:userEmail/elements/:elementId/tasks/:taskId
router.delete(
	"/users/:userEmail/elements/:elementId/tasks/:taskId",
	async (req, res) => {
		const { userEmail, elementId, taskId } = req.params;
		if (userEmail.length > 0 && elementId.length > 0 && taskId.length > 0) {
			try {
				const selectQuery =
					"SELECT task_id FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id =$3";
				let selectResult = await pool.query(selectQuery, [userEmail,elementId,taskId]);
				if (selectResult.rows.length === 0) {
					return res.status(404).send("Not found.");
				} else {
					await pool.query(
						"DELETE  FROM tasks WHERE user_email=$1 AND element_id=$2 AND task_id =$3",
						[userEmail, elementId, taskId]
					);
					const data =
						"SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2";
					await pool.query(data, [userEmail, elementId]).then((result) => {
						if (result.rows.length > 0) {
							return res.send(result.rows);
						} else {
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
			return res
				.status(400)
				.send({
					success: false,
					message: "Something went wrong while deleting your task",
				});
		}
	}
);


//Get all the tasks for a user element
// GET /api/users/:userEmail/elements/:elementId/tasks
router.get("/users/:userEmail/elements/:elementId/tasks", (req, res) => {
	const { userEmail, elementId } = req.params;

	pool
		.query("SELECT * FROM tasks WHERE user_email=$1 AND element_id=$2", [
			userEmail,
			elementId,
		])
		.then((result) => {
			if (result.rows.length > 0) {
				return res.send(result.rows);
			} else {
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
});

// // User's tasks per element with status title and milestone title => inner join per element for user
// Will use this to quickly display task details in front end when mapping tasks
// GET /api/users/:userEmail/elements/:elementId/tasks
router.get("/users/:userEmail/elements/:elementId/detailedTasks", async (req, res) => {
	try {
		const { userEmail, elementId } = req.params;
		const Query =
			"SELECT task_title , due_date, evidence, element_title, status_title FROM tasks INNER JOIN elements ON tasks.element_id = elements.element_id INNER JOIN status ON tasks.status_id = status.status_id WHERE user_email = $1 AND elements.element_id=$2";
		const result = await pool.query(Query, [userEmail, elementId]);
		res.send(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

//Add a task under a particular element for a particular user
// POST /api/users/:userEmail/elements/:elementId/tasks
router.post("/users/:userEmail/elements/:elementId/tasks", (req, res) => {
	const { taskTitle, dueDate, evidence, statusId } = req.body;

	const { userEmail, elementId } = req.params;

	if (userEmail.length > 0 && elementId.length > 0) {
		if (!taskTitle || !statusId) {
			return res
				.status(400)
				.send({
					message:
						"Task Title and Status cannot be empty, please edit and try again :D ",
				});
		} else {
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
		return res
			.status(400)
			.send({
				success: false,
				message:
					"Something went wrong while trying to add this task under the specified element, please refresh and try again",
			});
	}
});


// Users Table:
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
			pool
				.query("SELECT mentor_access FROM users WHERE user_email=$1", userEmail)
				.then((result) => res.send({ message: "user already existed", mentorAccess: result.rows[0] }));
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

export default router;
