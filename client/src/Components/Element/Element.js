import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import Tasks from "../Tasks/Tasks";
import "./Element.css";
import PopUpForm from "../Tasks/PopUpForm";

const Element = (props) => {
	//states for pop up edit task form
	const [isOpen, setIsOpen] = useState(false);
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};
	const [refresh, setRefresh] = useState(true);
	const [clicked, setClicked] = useState(false);
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
								elementId={props.id}
								user={props.user}
								refreshFunc={() => setRefresh(!refresh)}
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