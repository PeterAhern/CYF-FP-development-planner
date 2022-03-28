import { useState } from "react";
import GraduateTasks from "./GraduateTasks";
import "./Popup.css";
import Comment from "../MentorFeedback/Comment";

const GraduateElement = (props) => {
	const [clicked, setClicked] = useState(false);
	const [comment, setComment] = useState(false);
	const [refresh, setRefresh] = useState(true);

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
				Give Feedback
			</button>

			{comment && (
				<Comment
					senderEmail={props.mentorEmail}
					email={props.graduateEmail}
					id={props.id}
					refresh={refresh}
					refreshFunc={() => setRefresh(!refresh)}
				/>
			)}

			{clicked && (
				<GraduateTasks
					userEmail={props.mentorEmail}
					elementId={props.id}
					className="element"
					senderEmail={props.graduateEmail}
				/>
			)}
		</div>
	);
};
export default GraduateElement;
