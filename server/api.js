import { Router } from "express";

import pool from "./db";

const router = Router();

// Get all the tasks
router.get("/tasks", (req, res) => {
	pool.query("SELECT * FROM tasks").then((result) => {
		return res.send(result.rows);
	});
});
router.get("/", (_, res) => {
	res.json({ message: "Hello, from the api route!" });
});

router.post("/tasks", (req, res) => {
	const { task_title, due_date, evidence, status_title, element_title } =
		req.body;
	let params = [];
	if (!task_title) {
		return res
			.status(404)
			.send({ success: false, message: "Task title cannot be empty" });
	} else {
		params.push(task_title);
	}
	if (due_date.length > 0) {
		params.push(due_date);
	} else {
		params.push("");
	}
	if (evidence.length > 0) {
		params.push(evidence);
	} else {
		params.push("");
	}
	if (status_title.length > 0) {
		pool
			.query("SELECT Status_id FROM status WHERE Status_title = $1", [
				status_title,
			])
			.then((result) => {
				params.push(result.rows[0].status_id);
			})
			.catch((err) => console.log(err));
	} else {
		res
			.status(404)
			.send({ success: false, message: "status_title cannot be empty" });
	}
	if (element_title.length > 0) {
		pool
			.query("SELECT Element_id FROM elements WHERE Element_title = $1", [
				element_title,
			])
			.then((result) => {
				params.push(result.rows[0].element_id);
			})
			.catch((err) => console.log(err));
	} else {
		res
			.status(404)
			.send({ success: false, message: "element_title cannot be empty" });
	}

	pool
		.query(
			"INSERT INTO tasks (Task_title,Due_date, Evidence, Status_id, Element_id) VALUES ($1,$2,$3,$4,$5)",
			params
		)
		.then(() => {
			pool.query("SELECT * FORM tasks").then((result) => res.send(result.rows));
		});
});
export default router;

//Delete a task

router.delete("/:task_title", (req, res) => {
	const title = req.params.task_title;
	pool
		.query("DELETE  FROM tasks WHERE Task_title = $1", [title])
		.then(() => res.send(`Task ${title} deleted !`))
		.catch((error) => {
			console.error(error);
			res.status(500).json(error);
		});
});

//Updating task status/due date/evidence
router.put("/:task_title", (req, res) => {
	const title = req.params.task_title;
	const status = req.body.status_title;
	const date = req.body.due_date;
	const evidence = req.body.evidence;

	pool
		.query("SELECT Status_id FROM status WHERE Status_title = $1", [title])
		.then((result) => {
			const newStatusId = result.rows[0].Status_id;
			return pool
				.query("SELECT * FROM tasks WHERE Task_title = $1", [title])
				.then((result) => {
					const originalValues = result.rows[0];
					return pool
						.query(
							"UPDATE tasks SET Status_id=$1,Due_date =$2,Evidence = $3 WHERE Task_title=$4",
							[
								originalValues.Status_id || newStatusId,
								originalValues.Due_date || date,
								originalValues.Evidence || evidence,
								title,
							]
						)
						.then(() => res.send(`status ${status} updated!`))
						.catch((error) => {
							console.error(error);
							res.status(500).json(error);
						});
				});
		});
});

//Insert a new user
router.post("/user", (req, res) => {
	const userEmail = req.body.user.email;
	pool
		.query("SELECT User_email FROM users WHERE User_email = $1", [userEmail])
		.then((result) => {
			if (result.rows.length > 0) {
				return res.send({ message: "user already existed" });
			} else {
				return pool
					.query("INSERT INTO users (User_email) VALUES ($1)", [userEmail])
					.then((result) => res.send(result.rows))
					.catch((error) => {
						console.error(error);
						res.status(500).send(error);
					});
			}
		});
});
