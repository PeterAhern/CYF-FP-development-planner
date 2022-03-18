import React, { useState, useEffect, useCallback } from "react";
import Card from "../UI/Card/Card";

const Tasks = ({ refresh, refreshFunc }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchTasksHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/tasks");

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			setTasks(data);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchTasksHandler();
	}, [fetchTasksHandler, refresh]);

	const deleteTask = async (id) => {
		const response = await fetch(`/api/tasks/${id}`, {
			method: "DELETE",
		});
		refreshFunc();
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	};

	let content = <p>Found no tasks.</p>;

	if (tasks.length > 0) {
		content = tasks.map((task) => (
			<Card key={task.task_id} toggle={true}>
				<h1>{task.task_title}</h1>
				<button
					className="btn btn-danger"
					onClick={() => {
						deleteTask(task.task_id);
					}}
				>
					Delete
				</button>
				<div>
					{task.evidence && (
						<h4>
							<a href={task.evidence} target="_blank" rel="noreferrer">
								Evidence
							</a>
						</h4>
					)}
				</div>
			</Card>
		));
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return <>{content}</>;
};

export default Tasks;
