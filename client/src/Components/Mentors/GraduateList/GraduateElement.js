import { useState } from "react";
import MentorsTasks from "./MentorsTasks";

const GraduateElement = (props) => {
	const [clicked, setClicked] = useState(false);
	// "/users/:userEmail/elements/:elementId/detailedTasks"

	// let userEmail = props.graduateEmail;
	// let elementId = props.id;
	return (
		<div className="element">
			<button
				value={props.graduateEmail}
				name={props.id}
				type="button"
				className="btn btn-danger"
				onClick={() => setClicked(!clicked)}
			>
				{props.name}
			</button>
			{clicked && (
				<MentorsTasks userEmail={props.graduateEmail} elementId={props.id} />
			)}
		</div>
	);
};
export default GraduateElement;
