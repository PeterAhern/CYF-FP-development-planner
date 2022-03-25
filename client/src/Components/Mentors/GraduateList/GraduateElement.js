import { useState } from "react";
import GraduateTasks from "./GraduateTasks";
import "./Popup.css";
import Comment from "./Comment";

const GraduateElement = (props) => {
	const [clicked, setClicked] = useState(false);
	const [comment, setComment] = useState(false);

	return (
		<div>
			<button
				value={props.graduateEmail}
				name={props.id}
				type="button"
				className="btn btn-danger"
				onClick={() => setClicked(!clicked)}
			>
				{props.name}
			</button>
			<button
				className="comment btn btn-danger"
				onClick={() => setComment(!comment)}
			>
				+
			</button>
			{comment && <Comment email={props.graduateEmail} id={props.id} />}

			{clicked && (
				<GraduateTasks
					userEmail={props.graduateEmail}
					elementId={props.id}
					className="element"
				/>
			)}
		</div>
	);
};
export default GraduateElement;
