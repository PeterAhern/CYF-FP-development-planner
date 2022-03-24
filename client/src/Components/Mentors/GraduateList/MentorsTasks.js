import React, { useState, useEffect, useCallback } from "react";
import Card from "../../UI/Card/Card";
// for date formatting on task card
import moment from "moment";

const MentorsTasks = ({ userEmail, elementId }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	//states for pop up edit task form

	const fetchTasksHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/users/${userEmail}/elements/${elementId}/tasks`
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();

			const loadedTasks = [];
			for (const key in data) {
				loadedTasks.push({
					id: data[key].task_id,
					title: data[key].task_title,
					user_email: data[key].user_email,
					due_date: data[key].due_date,
					evidence: data[key].evidence,
					element_id: data[key].element_id,
					status_id: data[key].status_id,
				});
			}
			setTasks(loadedTasks);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, [userEmail, elementId]);

	useEffect(() => {
		fetchTasksHandler();
	}, [fetchTasksHandler]);

	const statusShower = (id) => {
		if (id === 1) {
			return "Not Started";
		} else if (id === 2) {
			return "In Progress";
		} else if (id === 3) {
			return "Complete";
		} else if (id === 4) {
			return "N/A";
		}
	};

	let content = <p>Found no tasks.</p>;

	if (tasks.length > 0) {
		content = tasks.map((task) => (
			<Card key={task.id}>
				<h1 className="card_title">{task.title}</h1>
				<h3 className="card_due_date">
					Due: {moment.utc(task.due_date).format("DD/MM/YY")}
				</h3>
				<h3 className="card_status">{statusShower(task.status_id)}</h3>

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

export default MentorsTasks;
