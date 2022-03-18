import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import Tasks from "../Tasks/Tasks";
import "./Element.css";

const Element = (props) => {
	const [refresh, setRefresh] = useState(true);
	const [clicked, setClicked] = useState(false);
	console.log(props.currUser);
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
					<TaskForm
						elementId={props.id}
						// userEmail={props.currUser.email}
						userEmail="test1@gmail.com"
						refreshFunc={() => setRefresh(!refresh)}
					/>
					<Tasks
						elementId={props.id}
						refresh={refresh}
						refreshFunc={() => setRefresh(!refresh)}
						// userEmail={props.currUser.email}
						userEmail="test1@gmail.com"
					/>
				</div>
			)}
		</div>
	);
};
export default Element;



//function called refresh task, pass that down into task form
//element will need its own state, will need refresh
//