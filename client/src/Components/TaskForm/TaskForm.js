import { useState } from "react";

const TaskForm = ({ elementId, user }) => {
	const [task, setTask] = useState({
		taskTitle: "",
		userEmail: user,
		dueDate: "",
		evidence: "",
		elementId: elementId,
		statusId: 1,
	});
console.log(user);
	const changeHandler = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setTask({ ...task, [inputName]: inputValue });
	};
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: JSON.stringify(task),
	};

	const addTask = async () => {
		const response = await fetch(
			"https://elemental-planner.herokuapp.com/api/tasks",
			requestOptions
		);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	};
	const submitHandler = (event) => {
		event.preventDefault();
		addTask();
		setTask({
			taskTitle: "",
			userEmail: "",
			dueDate: "",
			evidence: "",
			elementId: 1,
			statusId: 1,
		});
	};

	const statusChangeHandler = (e) => {
		const statusIdValue = e.target.value;
		setTask({ ...task, statusId: statusIdValue });
	};

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
			<button>Add Task</button>
		</form>
	);
};

export default TaskForm;
