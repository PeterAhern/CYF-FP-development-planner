import { useState } from "react";

const TaskForm = ({
	refreshFunc,
	editingTask,
	setEditingTask, addNewTaskForm,
}) => {
	let initialState = () => {
		if (editingTask) {
			if (editingTask.editing) {
				return editingTask.initialFormState;
			}
		} else {
			return addNewTaskForm;
		}
	};
	const [task, setTask] = useState(initialState);
	const changeHandler = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setTask({ ...task, [inputName]: inputValue });
	};
	const addTaskOptions = {
		method: "POST", //if editingTask = true, method changes to PUT
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(task),
	};
	const updateTaskOptions = {
		method: "UPDATE",
		headers: {
			"Content-Type": "application/json",
			// Accept: "application/json",
		},
		body: JSON.stringify(task),
	};
	//addTask fetch request
	const addTask = async () => {
		const response = await fetch("/api/tasks", addTaskOptions);
		if (!response.ok) {
			throw new Error("Failed to add new task");
		}
	};
	//editTask fetch request

	const updateTask = async () => {
		const response = await fetch(
			`/api/tasks/${task.id}`,
			updateTaskOptions
		);
		if (!response.ok) {
			throw new Error("Failed to update");
		}
	};
	const submitHandler = async (event) => {
		event.preventDefault();
		if (addNewTaskForm) {
			await addTask();
			setTask({
				taskTitle: "",
				userEmail: "test1@gmail.com",
				dueDate: "",
				evidence: "",
				elementId: 1,
				statusId: 1,
			});
		} else {
			await updateTask();
			setEditingTask({ ...editingTask, editing: false, initialFormState: {} });
		}
		refreshFunc();
	};

	const statusChangeHandler = (e) => {
		const statusIdValue = e.target.value;
		setTask({ ...task, statusId: statusIdValue });
	};


	let taskButton = <button>Add Task</button>;
	if(editingTask){
		if(editingTask.editing) {
			taskButton =  <button>Update</button> ;
		}
	}
	return (
		<form onSubmit={submitHandler} className="form-align">
			<div className="control-group">
				<div>
					<label htmlFor="taskTitle">Task Title: </label>
					<input
						type="text"
						id="taskTitle"
						name="taskTitle"
						value={task.taskTitle}
						onChange={changeHandler}
					/>
				</div>
				<div>
					<label htmlFor="dueDate">Due Date: </label>
					<input
						type="date"
						name="dueDate"
						placeholder="Set due date"
						onChange={changeHandler}
						value={task.dueDate}
					/>
				</div>
				<div>
					<label htmlFor="Progress Status">Progress Status: </label>
					<select
						name="Progress Status"
						id="statusDropDown"
						onChange={statusChangeHandler}
					>
						<option name="1" value="1">
							Not Started
						</option>
						<option name="2" value="2">
							In Progress
						</option>
						<option name="3" value="3">
							Complete
						</option>
						<option name="4" value="4">
							N/A
						</option>
					</select>
				</div>
				<div>
					<label htmlFor="evidence">Evidence link: </label>
					<input
						type="text"
						id="evidence"
						name="evidence"
						value={task.evidence}
						onChange={changeHandler}
					/>
				</div>
			</div>
			{taskButton}
		</form>
	);
};

export default TaskForm;
