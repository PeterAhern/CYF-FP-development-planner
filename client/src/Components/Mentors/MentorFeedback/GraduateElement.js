import { useState } from "react";
import GraduateTasks from "./GraduateTasks";
import MentorsComment from "./MentorsComment";

import TaskForm from "../../TaskForm/TaskForm";
import PopUpForm from "../../Tasks/PopUpForm";
import Popup from "./Popup";

const GraduateElement = (props) => {
	const [clicked, setClicked] = useState(false);
	const [comment, setComment] = useState(false);
	const [refresh, setRefresh] = useState(true);
	const [buttonPopup, setButtonPopup] = useState(false);
	const [assignTaskClicked, setAssignTaskClicked] = useState(false);

	const [isOpen, setIsOpen] = useState(false);

	const assignTaskHandler = () => setAssignTaskClicked(!assignTaskClicked);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

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
				onClick={() => setButtonPopup(true)}
			>
				Give Feedback
			</button>
			<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
				<MentorsComment
					senderEmail={props.mentorEmail}
					email={props.graduateEmail}
					id={props.id}
					refresh={refresh}
					refreshFunc={() => setRefresh(!refresh)}
				/>
			</Popup>

			{clicked && (
				<>
					<button onClick={assignTaskHandler}>Assign Task</button>
					{assignTaskClicked && (
						<div className="tasksSection">
							<input
								type="button"
								className="addNewTaskButton"
								value="Add New Task"
								onClick={togglePopup}
							/>
							{isOpen && (
								<PopUpForm
									content={
										<>
											<b>Assign task details</b>
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
						</div>
					)}
					<GraduateTasks
						userEmail={props.mentorEmail}
						elementId={props.id}
						className="element"
						senderEmail={props.graduateEmail}
					/>
				</>
			)}
		</div>
	);
};
export default GraduateElement;
