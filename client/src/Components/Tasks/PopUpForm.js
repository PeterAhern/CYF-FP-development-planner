import React from "react";
// import TaskForm from "../TaskForm/TaskForm";
import "./PopUpForm.css";

const PopUpForm = (props) => {
	return (
		<div className="popup-box">
			<div className="box">
				<span className="close-icon" onClick={props.handleClose}>
					x
				</span>
				{props.content}
			</div>
		</div>
	);
};

export default PopUpForm;
