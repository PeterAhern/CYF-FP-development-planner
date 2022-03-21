import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import Tasks from "../Tasks/Tasks";
import "./Element.css";
import PopUpForm from "../Tasks/PopUpForm";

const Element = (props) => {
	//states for pop up edit task form
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		if(props.user!==" "){
			setUserPasser(props.user);
		}
		// console.log(userPasser);
		// console.log(props.user);
		setIsOpen(!isOpen);
	};
	const [refresh, setRefresh] = useState(true);
	const [clicked, setClicked] = useState(false);
	const [userPasser, setUserPasser] = useState("test1@gmail.com");

	return (
		<div className="element">
			<button
				type="button"
				className="btn btn-danger"
				onClick={() => setClicked(!clicked)}
			>
				{props.name}
			</button>
			<input
				type="button"
				className="btn btn-danger"
				value="+"
				onClick={togglePopup}
			/>
			{isOpen && (
				<PopUpForm
					content={
						<>
							<b>Fill in task details</b>
							<TaskForm
								refreshFunc={() => setRefresh(!refresh)}
								addNewTaskForm={{
									taskTitle: "",
									userEmail: userPasser,
									dueDate: "",
									evidence: "",
									elementId: props.id,
									statusId: 1,
								}}
							/>
						</>
					}
					handleClose={togglePopup}
				/>
			)}
			{clicked && (
				<div className="form">
					<Tasks refresh={refresh} refreshFunc={() => setRefresh(!refresh)} />
				</div>
			)}
		</div>
	);
};
export default Element;