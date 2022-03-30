import React, { useState, useEffect, useCallback } from "react";
// import Card from "../UI/Card/Card";
import PopUpForm from "./PopUpForm";
import TaskForm from "../TaskForm/TaskForm";
//for date formatting on task card
import moment from "moment";
import "./Tasks.css";
import * as Components from "../UI/Button/Button";
import { Badge } from "react-bootstrap";

const Tasks = ({ userEmail, elementId, refresh, refreshFunc }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editingTask, setEditingTask] = useState({
		editing: false,
		initialFormState: {},
	});
	//states for pop up edit task form
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const editTaskHandler = (e, index) => {
		e.persist();
		setEditingTask({
			...editingTask,
			editing: true,
			initialFormState: {
				id: tasks[index].id,
				taskTitle: tasks[index].title,
				userEmail: tasks[index].user_email,
				dueDate: tasks[index].due_date,
				evidence: tasks[index].evidence,
				elementId: tasks[index].element_id,
				statusId: tasks[index].status_id,
			},
		});
		togglePopup();
		console.log(tasks[index].due_date);
		console.log(tasks[index].status_id);
	};

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
			console.log(data);
			//when no tasks in db, data is sent back as a message (instead of tasks data) with success=true
			if (data.success === true) {
				setTasks([]);
			} else {
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
			}
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, [userEmail, elementId]);

	useEffect(() => {
		fetchTasksHandler();
	}, [fetchTasksHandler, refresh]);

	const deleteTask = async (id) => {
		const response = await fetch(
			`/api/users/${userEmail}/elements/${elementId}/tasks/${id}`,
			{
				method: "DELETE",
			}
		);
		refreshFunc();
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	};

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

	let content = <p>You have no tasks.</p>;
	if (tasks.length > 0) {

		content = tasks.map((task, index) => {
			// moment(n.entry.date_entered, 'YYYY/MM/DD');
			// const date = moment.utc(task.due_date).format("DD/MM/YY");
			const month = moment.utc(task.due_date).month();
			const day = moment.utc(task.due_date).date();
			const year = moment.utc(task.due_date).year();
			return (
				<div key={task.id} className="taskCard">
					<section className="leftTaskDetails">
						<div className="card_due_date">
							<h4 className="taskDueLabel">Due</h4>
							<div className="expense-date">
								<div className="expense-date__day">{day}</div>
								<div className="expense-date__month">{month}</div>
								<div className="expense-date__year">{year}</div>
							</div>
						</div>

						<h3 className="card_status">{statusShower(task.status_id)}</h3>
					</section>
					<h1 className="card_title">{task.title}</h1>
					<section className="rightTaskDetails">
						<section className="deleteTaskButtonSection">
							<Components.Button
								// className="deleteTaskButton"
								onClick={() => {
									window.confirm("Are you sure you want to delete?") &&
										deleteTask(task.id);
								}}
							>
								Delete
							</Components.Button>
						</section>
						<section className="editTaskButtonSection">
							<Components.GhostButton
								onClick={(e) => editTaskHandler(e, index)}
							>
								Edit Task
							</Components.GhostButton>
							{isOpen && (
								<PopUpForm
									content={
										<>
											<b>Edit your task</b>
											<TaskForm
												refreshFunc={refreshFunc}
												editingTask={editingTask}
												setEditingTask={setEditingTask}
											/>
										</>
									}
									handleClose={togglePopup}
								/>
							)}
						</section>

						<h4 className="bottomTaskDetails">
							{task.evidence && (
									<Badge bg="secondary">
										<a href={task.evidence} target="_blank" rel="noreferrer">
											Evidence
										</a>
									</Badge>
							)}

						</h4>

					</section>
				</div>
			);<<<<<<< formating
		});
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return <div className="tasksContainer">{content}</div>;
};

export default Tasks;
