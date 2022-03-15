import { useState } from "react";
// import DateSelector from "./DateSelector";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const TaskForm = (props) => {
	const [task, setTask] = useState({
		taskTitle: "",
		userEmail: "test1@gmail.com",
		dueDate: "",
		evidence: "",
		elementId: 1,
		statusId: 0,
 });
	console.log(task);
	const [formReFetch, setFormReFetch] = useState(false);
	const [buttonText, setButtonText] = useState("Status");
	const { reFetch }  = props;
	const changeHandler = (e) => {
		console.log(e.target.name);
		console.log(e.target.value);

		const inputName = e.target.name;
		const inputValue = e.target.value;
		setTask({ ...task, [inputName]: inputValue });
	};
	const requestOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(task),
	};

	const addTask = async () => {
		const response = await fetch(
			"http://localhost:3000/api/tasks",
			requestOptions
		);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	};
	const submitHandler = (event) => {
		event.preventDefault();
		// if (buttonText === "Not Started") {
		// 	setTask({ ...task, statusId: 1 });
		// } else if(buttonText === "In Progress") {
		// 	setTask({ ...task, statusId: 2 });
		// } else if(buttonText === "Complete"){
		// 	setTask({ ...task, statusId: 3 });
		// } else {
		// 	setTask({ ...task, statusId: 4 });
		// }
		addTask();
		setFormReFetch(!formReFetch);
		reFetch(formReFetch);
		setTask({
			taskTitle: " ",
		});
	};

	// const dueDateValue = (date) => {
	// 	setTask({ ...task, dueDate: date });

	// };

	// const getStatusId = (buttonText) => {
	// 	if (buttonText === "Not Started") {
	// 		setTask({ ...task, statusId: 1 });
	// 	} else if(buttonText === "In Progress") {
	// 		setTask({ ...task, statusId: 2 });
	// 	} else if(buttonText === "Complete"){
	// 		setTask({ ...task, statusId: 3 });
	// 	} else {
	// 		setTask({ ...task, statusId: 4 });
	// 	}
	// };

	const progressChangeHandler = () => setDueDate();

	return (
		<form onSubmit={submitHandler}>
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
						onChange={progressChangeHandler}
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

				{/* <div>
					<p>
						Due Date (optional): <DateSelector dueDateValue={dueDateValue} />
					</p>
				</div> */}
				{/* <div>
					Progress:{" "}
					<DropdownButton title={buttonText}>
						<DropdownItem
							onClick={() => {
								setButtonText("N/A");
							}}
						>
							N/A
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setButtonText("Not Started");
							}}
						>
							Not Started
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setButtonText("In Progress");
							}}
						>
							In Progress
						</DropdownItem>
						<DropdownItem
							onClick={() => {
								setButtonText("Complete");
							}}
						>
							Complete
						</DropdownItem>
					</DropdownButton>
				</div> */}
				<div>
					<label htmlFor="evidence">Evidence link: </label>
					<input type="text" id="evidence" />
				</div>
			</div>
			<button>Add Task</button>
		</form>
	);
};

export default TaskForm;
