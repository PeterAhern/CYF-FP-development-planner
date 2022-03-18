import React, { useState, useEffect, useCallback } from "react";
import Card from "../UI/Card/Card";
import PopUpForm from "./PopUpForm";
import TaskForm from "../TaskForm/TaskForm";

/*
	{
		taskTitle: "",
		// userEmail: user,
		userEmail:"test1@gmail.com",
		dueDate: "",
		evidence: "",
		elementId: elementId,
		statusId: 1,
	}
*/


const Tasks = ( { refresh, refreshFunc }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	//states for pop up edit task form
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const fetchTasksHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/tasks");

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
	}, [fetchTasksHandler, refresh]);

	//deleteTaskHandler
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
					<Card key={task.id}>
						<h1>{task.title}</h1>
						<button
							className="btn btn-danger"
							onClick={() => {
								window.confirm("Are you sure you want to delete?") &&
									deleteTask(task.id);
							}}
						>
							Delete
						</button>
						<div>
							<input
								type="button"
								className="btn btn-danger"
								value="Edit Task"
								onClick={togglePopup}
							/>
							{isOpen && (
								<PopUpForm
									content={
										<>
											<b>Edit your task</b>
											<TaskForm
												props={task.id}
												elementId={task.element_id}
												initialFormState={{
													taskTitle: task.title,
													userEmail: task.user_email,
													dueDate: task.due_date,
													evidence: task.evidence,
													elementId: task.element_id,
													statusId: task.status_id,
												}}
											/>
										</>
									}
									handleClose={togglePopup}
								/>
							)}
						</div>
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

	return (
		<>
			{content}
		</>
	);
};

export default Tasks;