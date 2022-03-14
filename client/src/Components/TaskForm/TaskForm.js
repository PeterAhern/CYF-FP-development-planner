// Styling
// import "./Task.css";
import useInput from "../../hooks/useInput";
import { useState } from "react";


// Add verifications here
const isNotEmpty = (value) => value.trim() !== "";
// const isEmail = (value) => value.includes("@");

// Card for general styling from UI
import Card from "../UI/Card/Card";
import DateSelector from "./DateSelector";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const TaskForm = ({ onSubmit }) => {

    const {
			value: taskTitleValue,
			isValid: taskTitleIsValid,
			hasError: taskTitleHasError,
			valueChangeHandler: taskTitleChangeHandler,
			inputBlurHandler: taskTitleBlurHandler,
			reset: resetTaskTitle,
		} = useInput(isNotEmpty);

		let formIsValid = false;

		if (taskTitleIsValid) {
			formIsValid = true;
		}

		const submitHandler = (event) => {
			event.preventDefault();

			if (!formIsValid) {
				return;
			}
			//need to post the task details
			console.log("Submitted");
			console.log(taskTitleValue);

			resetTaskTitle();
			// resetLastName();
			// resetEmail();
		};

		const taskTitleClasses = taskTitleHasError
			? "form-control invalid"
			: "form-control";

			const [buttonText, setButtonText] = useState("Status");

			function doChanges(text) {
				setButtonText(text);
			}

    return (
			<Card>
				<form onSubmit={submitHandler}>
					<div className="control-group">
						<div className={taskTitleClasses}>
							<label htmlFor="taskTitle">Task Title: </label>
							<input
								type="text"
								id="taskTitle"
								value={taskTitleValue}
								onChange={taskTitleChangeHandler}
								onBlur={taskTitleBlurHandler}
							/>
							{taskTitleHasError && (
								<p className="error-text">Please Enter a Task Name...</p>
							)}
						</div>
						<div>
							<p>
								Due Date (optional): <DateSelector />
							</p>
						</div>
						<div>
							Progress: <DropdownButton title={buttonText}>
								<DropdownItem
									onClick={() => {
										doChanges("N/A");
									}}
								>
									N/A
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										doChanges("Not Started");
									}}
								>
									Not Started
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										doChanges("In Progress");
									}}
								>
									In Progress
								</DropdownItem>
								<DropdownItem
									onClick={() => {
										doChanges("Complete");
									}}
								>
									Complete
								</DropdownItem>
							</DropdownButton>
						</div>
						<div>
							{/* evidence input option only given when status set to complete */}
							<label htmlFor="evidence">Evidence link: </label>
							<input
								type="text"
								id="evidence"
								// value={taskTitleValue}
								// onChange={taskTitleChangeHandler}
								// onBlur={taskTitleBlurHandler}
							/>
						</div>
					</div>
					<div className="form-actions">
						<button disabled={!formIsValid}>Add Task</button>
					</div>
				</form>
			</Card>
		);

};

export default TaskForm;