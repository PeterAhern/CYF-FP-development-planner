import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import Tasks from "../Tasks/Tasks";
import "./Element.css";
import PopUpForm from "../Tasks/PopUpForm";
import Comment from "../Mentors/GraduateList/Comment";

const Element = (props) => {
	//states for pop up edit task form
	const [isOpen, setIsOpen] = useState(false);
	const [commentsOpen, setCommentsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};
	const toggleComments = () => {
		setCommentsOpen(!commentsOpen);
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
				value="Add New Task"
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
									userEmail: props.graduateEmail,
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
			<input
				type="button"
				className="btn btn-danger"
				value="View Feedback"
				onClick={toggleComments}
			/>
			{commentsOpen && (
				<PopUpForm
					content={
						<>
							<b>Mentor Feedback</b>
							<Comment
								refresh={refresh}
								refreshFunc={() => setRefresh(!refresh)}
								senderEmail={props.graduateEmail}
								email={props.graduateEmail}
								id={props.id}
							/>
						</>
					}
					handleClose={toggleComments}
				/>
			)}
			{clicked && (
				<div className="form">
					<Tasks
						userEmail={props.graduateEmail}
						elementId={props.id}
						refresh={refresh}
						refreshFunc={() => setRefresh(!refresh)}
					/>
				</div>
			)}
		</div>
	);
};
export default Element;