import { Router } from "express";

import pool from "./db";

const router = Router();

router.get("/tasks", (req, res) => {
	pool.query("SELECT * FROM tasks").then((result) => {
		// console.log(result.rows);
		return res.send(result.rows);
	});
});

router.get("/", (_, res) => {
	return res.json({ message: "Hello, from the api route!" });
});

export default router;
