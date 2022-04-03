import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { GraduateTasksStyles } from "./GraduateTasks.styles";
import { Badge } from "react-bootstrap";
const GraduateTasks = ({ elementId, senderEmail }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchTasksHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/users/${senderEmail}/elements/${elementId}/tasks`
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
	}, [senderEmail, elementId]);

	useEffect(() => {
		fetchTasksHandler();
	}, [fetchTasksHandler]);

	console.log(tasks);

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
		content = tasks.map((task) => {
			const month = moment(task.due_date).format("MMM");<h4 className="taskDueLabel">Due By:</h4>;
			const day = moment(task.due_date).format("Do");
			const year = moment(task.due_date).year();
			return (
				<div className="taskCard" key={task.id}>
					<h1 className="card_title">{task.task_title}</h1>
					<section className="leftTaskDetails">
						<div className="card_due_date">
							<div className="expense-date">
								<div className="expense-date__day">{day}</div>
								<div className="expense-date__month">{month}</div>
								<div className="expense-date__year">{year}</div>
							</div>
						</div>
					</section>
					<section className="rightTaskDetails">
						<section className="StatusShower">
							<button>
								{task.status_id ? statusShower(task.status_id) : ""}
							</button>
						</section>
					</section>

					<div className="evidenceSide">
						<h4 className="taskEvidence">
							{task.evidence && (
								<Badge bg="secondary">
									<a href={task.evidence} target="_blank" rel="noreferrer">
										Evidence
									</a>
								</Badge>
							)}
						</h4>
					</div>
				</div>
			);
		});
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return <GraduateTasksStyles>{content}</GraduateTasksStyles>;
};

export default GraduateTasks;
