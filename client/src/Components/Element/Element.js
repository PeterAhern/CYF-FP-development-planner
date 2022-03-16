import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import Tasks from "../Tasks/Tasks";
import "./Element.css";

const Element = (props) => {
	const [clicked, setClicked] = useState(false);
	return (
		<div className="element">
			<button
				type="button"
				className="btn btn-danger"
				onClick={() =>setClicked(!clicked)}
			>{props.name}</button>
			{clicked && (
				<div className="form">
					<TaskForm elementId ={props.id}  />
					<Tasks />
				</div>
			)}
		</div>
	);
};
export default Element;
