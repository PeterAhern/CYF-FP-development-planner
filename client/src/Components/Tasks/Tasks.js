import React, { useState, useEffect, useCallback } from "react";
import Card from "../UI/Card/Card";
import PopUpForm from "./PopUpForm";
import TaskForm from "../TaskForm/TaskForm";

const Tasks = ( { refresh, refreshFunc, setRefresh }) => {
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [editingTask, setEditingTask] = useState( { editing: false, initialFormState: {} });
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
					element_id: data[key].element_id,
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

        content = tasks.map((task, index) => (
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
								// onClick={editTaskHandler}
								onClick={(e) => editTaskHandler(e, index)}
							/>
							{isOpen && (
								<PopUpForm
									content={
										<>
											<b>Edit your task</b>
											<TaskForm
												refreshFunc={() => setRefresh(!refresh)}
												editingTask={editingTask}
												setEditingTask={setEditingTask}
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