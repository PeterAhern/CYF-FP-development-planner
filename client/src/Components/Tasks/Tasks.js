import React, { useState, useEffect, useCallback } from "react";

import Card from "../UI/Card/Card";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchTasksHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				"http://localhost:3000/api/tasks"
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const data = await response.json();

			const loadedTasks = [];

			// writing data transformation logic for the data I am getting back from firebase

			for (const key in data) {
				loadedTasks.push({
					id: data[key].task_id,
					title: data[key].task_title,
					due_date: data[key].due_date,
					evidence: data[key].evidence,
					status_id: data[key].status_id,
				});
			}

			setTasks(loadedTasks);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchTasksHandler();
	}, [fetchTasksHandler]);

    let content = <p>Found no tasks.</p>;

    if (tasks.length > 0) {
        content = tasks.map((task) => (
					<Card key={task.id} toggle={true}>
						<h1>{task.title}</h1>
						<div>
							{task.evidence && (
								<h4>
									<a href={task.evidence} target="_blank" rel="noreferrer">Evidence</a>
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

	return (
		<>
			{content}
		</>
	);
};

export default Tasks;