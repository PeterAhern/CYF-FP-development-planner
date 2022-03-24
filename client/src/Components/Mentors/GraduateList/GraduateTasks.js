import React, { useState, useEffect, useCallback } from "react";
// import Card from "../../UI/Card/Card";
import moment from "moment";
import "./Popup.css";

const GraduateTasks = ({ userEmail, elementId }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

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

			setTasks(data);
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
			<div className="task" key={task.id}>
				<p className="title">{task.task_title}</p>
				<p className="date" >
					Due: {moment.utc(task.due_date).format("DD/MM/YY")}
				</p>
				<p className="status">{statusShower(task.status_id)}</p>

				<div>
					{task.evidence && (
						<h6>
							<a href={task.evidence} target="_blank" rel="noreferrer">
								Evidence
							</a>
						</h6>
					)}
				</div>
			</div>
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

export default GraduateTasks;