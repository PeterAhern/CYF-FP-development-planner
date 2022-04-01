import { useState } from "react";
import moment from "moment";
import PreloadedTasks from "./PreloadedTasks.json";


const TaskForm = ({
	refreshFunc,
	editingTask,
	setEditingTask,
	addNewTaskForm,
	statusShower,
	togglePopup,
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
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(task),
	};
	const updateTaskOptions = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	};
	//addTask fetch request
	const addTask = async () => {
		const response = await fetch(`/api/users/${task.userEmail}/elements/${task.elementId}/tasks`, addTaskOptions);
		if (!response.ok) {
			throw new Error("Failed to add new task");
		}
	};
	//editTask fetch request

	const updateTask = async () => {
		const response = await fetch(
			`/api/users/${task.userEmail}/elements/${task.elementId}/tasks/${task.id}`,
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
				userEmail: task.userEmail,
				dueDate: "",
				evidence: "",
				elementId: task.elementId,
				statusId: 1,
			});
			refreshFunc();
			togglePopup();

		} else {
			await updateTask();
			setEditingTask({
				...editingTask,
				editing: false,
				initialFormState: {
					taskTitle: "",
					userEmail: task.userEmail,
					dueDate: "",
					evidence: "",
					elementId: task.elementId,
					statusId: 1,
				},
			});
			refreshFunc();
			togglePopup();
		}

	};
	const statusChangeHandler = (e) => {
		const statusIdValue = e.target.value;
		setTask({ ...task, statusId: statusIdValue });
	};

	let taskButton = <button>Add Task</button>;
	let status = "Select Status";
	let dueDate = "Set due date here";
	if (editingTask) {
		if (editingTask.editing) {
			taskButton = <button>Update</button>;
			status = statusShower(editingTask.initialFormState.statusId);
			dueDate = moment.utc(task.due_date).format("DD/MM/YYYY");
		}
	}

	const dropDownChanged = (e) => {
		const inputValue = e.target.value;
		setTask({ ...task, taskTitle: inputValue });
	};

	//variable to load the correct suggested task from the JSON file PreloadedTasks, matches task.elementId with corresponding data
	let elementRef;
	if(task.elementId ===1){
		elementRef = PreloadedTasks.technical.map((idea) => (
									<option key={idea} value={idea}>{idea}</option>));
		} else if(task.elementId ===2){
		elementRef = PreloadedTasks.employability.map((idea) => (
									<option key={idea} value={idea}>{idea}</option>));
		} else if(task.elementId===3){
		elementRef = PreloadedTasks.essentialSkills.map((idea) => (
									<option key={idea} value={idea}>{idea}</option>));
		}

	return (
		<form onSubmit={submitHandler} className="form-align">
			<div className="control-group">
				<div>
					<div>
						<label htmlFor="Suggested Tasks">Task ideas: </label>
						<select onChange={(e) => dropDownChanged(e)}>
							<option value="" selected>
								Choose or Create a Task
							</option>
							{elementRef}
						</select>
					</div>
					<label htmlFor="taskTitle">Task Title: </label>
					<input
						type="text"
						list="taskTitle"
						id="taskTitle"
						name="taskTitle"
						value={task?.taskTitle}
						onChange={changeHandler}
					/>
				</div>
				<div>
					<label htmlFor="dueDate">Due Date: </label>
					<input
						type="text"
						name="dueDate"
						onChange={changeHandler}
						onFocus={(e) => (e.target.type = "date")}
						placeholder={dueDate}
					/>
				</div>
				<div>
					<label htmlFor="Progress Status">Progress Status: </label>
					<select
						name="Progress Status"
						id="statusDropDown"
						onChange={statusChangeHandler}
					>
						{" "}
						<option selected hidden>
							{status}
						</option>
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
						value={task?.evidence}
						onChange={changeHandler}
					/>
				</div>
			</div>
			{taskButton}
		</form>
	);
};

export default TaskForm;
