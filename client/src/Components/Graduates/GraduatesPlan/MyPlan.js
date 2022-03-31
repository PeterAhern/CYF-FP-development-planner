import { useState } from "react";
import PropTypes from "prop-types";
import { MyPlanStyles } from "./MyPlan.styles";
// import Card from "../../UI/Card/Card";

// Components
import Navbar from "../../Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
import TaskForm from "../../TaskForm/TaskForm";
import PopUpForm from "../../Tasks/PopUpForm";
import Comment from "../../Mentors/GraduateList/Comment";
import * as Components from "../../UI/Button/Button";

const MyPlan = ({ user_email }) => {
	const [elementTasksId, setElementTasksId] = useState(1);
	const [refresh, setRefresh] = useState(true);

	const [isOpen, setIsOpen] = useState(false);

	const [commentsOpen, setCommentsOpen] = useState(false);
	//class for all popups to enable auto close when click outside the pop up
	// const PopUps = [...document.getElementsByClassName("PopUp")];

// 	document.addEventListener("click", function (e) {
// 		console.log(e.target);
// 		{if (document.getElementsByClassName("PopUp").contains(e.target)) {
// 			setIsOpen(isOpen);
// 			} else {
// 			togglePopup();
// 			}
// 	}
// });

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const toggleComments = () => {
		setCommentsOpen(!commentsOpen);
	};

	return (
		<MyPlanStyles>
			<Navbar graduateEmail={user_email} />
			<section className="gradPlanPage">
				<main role="main" className="elementsSection">
					<p className="elementsText">
						Welcome to your planning center, from here, you can view, edit and
						add new tasks to help you organise your career development.
					</p>
					<div>
						<button
							className="elementButton"
							onClick={() => setElementTasksId(1)}
						>
							Technical
						</button>
						<button
							className="elementButton"
							onClick={() => setElementTasksId(2)}
						>
							Job Search
						</button>
						<button
							className="elementButton"
							onClick={() => setElementTasksId(3)}
						>
							Soft Skills
						</button>
					</div>
				</main>

				<div className="tasksSection">
					<div className="elementTasksHeading">
						Your{" "}
						{elementTasksId === 1
							? "Technical"
							: elementTasksId === 2
							? "Job Search"
							: "Soft Skills"}{" "}
						Tasks
					</div>
					<div className="overallButtons">
						<Components.Button
							onClick={togglePopup}
							className="addNewTaskButton"
						>
							Add New Task
						</Components.Button>
						{isOpen && (
							<PopUpForm
								className="PopUp"
								content={
									<>
										<b>Fill in task details</b>
										<TaskForm
											togglePopup={togglePopup}
											refreshFunc={() => setRefresh(!refresh)}
											addNewTaskForm={{
												taskTitle: "",
												userEmail: user_email,
												dueDate: "",
												evidence: "",
												elementId: elementTasksId,
												statusId: 1,
											}}
										/>
									</>
								}
								handleClose={togglePopup}
							/>
						)}

						<Components.GhostButton
							className="viewFeedbackButton"
							onClick={toggleComments}
						>
							Feedback
						</Components.GhostButton>
						{commentsOpen && (
							<PopUpForm
								content={
									<>
										<b>Mentor Feedback</b>
										<Comment
											refresh={refresh}
											refreshFunc={() => setRefresh(!refresh)}
											senderEmail={user_email}
											email={user_email}
											id={elementTasksId}
										/>
									</>
								}
								handleClose={toggleComments}
							/>
						)}
					</div>
					<div className="elementTasksList">
						<Tasks
							userEmail={user_email}
							elementId={elementTasksId}
							refresh={refresh}
							refreshFunc={() => setRefresh(!refresh)}
						/>
					</div>
				</div>
			</section>
		</MyPlanStyles>
	);
};

MyPlan.propTypes = {
	user_email: PropTypes.string,
};

export default MyPlan;
