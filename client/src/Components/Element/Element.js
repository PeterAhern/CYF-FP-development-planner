import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import Tasks from "../Tasks/Tasks";
import "./Element.css";

const Element = (props) => {
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
			{clicked && (
				<div className="form">
					<TaskForm elementId={props.id} user={props.user} refresh={()=>setRefresh(!refresh)} />
					<Tasks refresh={refresh} />
				</div>
			)}
		</div>
	);
};
export default Element;



//function called refresh task, pass that down into task form
//element will need its own state, will need refresh
//