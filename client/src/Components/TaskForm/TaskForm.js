
// Styling
import "./Task.css";


import useInput from "../../hooks/useInput";


// Add verifications here
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");

// Card for general styling from UI
import Card from "../UI/Card/Card";

const TaskForm = (props) => {

    const {
			value: taskTitleValue,
			isValid: firstNameIsValid,
			hasError: taskTitleHasError,
			valueChangeHandler: taskTitleChangeHandler,
			inputBlurHandler: taskTitleBlurHandler,
			reset: resetFirstName,
		} = useInput(isNotEmpty);

		const {
			value: lastNameValue,
			isValid: lastNameIsValid,
			hasError: lastNameHasError,
			valueChangeHandler: lastNameChangeHandler,
			inputBlurHandler: lastNameBlurHandler,
			reset: resetLastName,
		} = useInput(isNotEmpty);

		const {
			value: emailValue,
			isValid: emailIsValid,
			hasError: emailHasError,
			valueChangeHandler: emailChangeHandler,
			inputBlurHandler: emailBlurHandler,
			reset: resetEmail,
		} = useInput(isEmail);

		let formIsValid = false;

		if (firstNameIsValid && lastNameIsValid && emailIsValid) {
			formIsValid = true;
		}

		const submitHandler = (event) => {
			event.preventDefault();

			if (!formIsValid) {
				return;
			}

			console.log("Submitted");
			console.log(taskTitleValue, lastNameValue, emailValue);

			resetFirstName();
			resetLastName();
			resetEmail();
		};

		const taskTitleClasses = taskTitleHasError
			? "form-control invalid"
			: "form-control";

		const lastNameClasses = lastNameHasError
			? "form-control invalid"
			: "form-control";

		const emailClasses = emailHasError
			? "form-control invalid"
			: "form-control";


    return (
			<Card>
				<form onSubmit={submitHandler}>
					<div className="control-group">
						<div className={taskTitleClasses}>
							<label htmlFor="taskTitle">Task Title</label>
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
						<div className={lastNameClasses}>
							<label htmlFor="name">Last Name</label>
							<input
								type="text"
								id="name"
								value={lastNameValue}
								onChange={lastNameChangeHandler}
								onBlur={lastNameBlurHandler}
							/>
							{lastNameHasError && (
								<p className="error-text">Please Enter a Last Name...</p>
							)}
						</div>
					</div>
					<div className={emailClasses}>
						<label htmlFor="name">E-Mail Address</label>
						<input
							type="text"
							id="name"
							value={emailValue}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
						/>
						{emailHasError && (
							<p className="error-text">Please Enter a Valid Email...</p>
						)}
					</div>
					<div className="form-actions">
						<button disabled={!formIsValid}>Submit</button>
					</div>
				</form>
			</Card>
		);

};

export default TaskForm;