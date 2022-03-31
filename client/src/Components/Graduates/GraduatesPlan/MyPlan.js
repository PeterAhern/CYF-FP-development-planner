import { useState } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./MyPlan.styles";
// import Card from "../../UI/Card/Card";

// Components
import Navbar from "../../Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
import TaskForm from "../../TaskForm/TaskForm";
import PopUpForm from "../../Tasks/PopUpForm";
import Comment from "../../Mentors/GraduateList/Comment";

const MyPlan = ({ user_email }) => {
	const [elementTasksId, setElementTasksId] = useState(1);
	const [refresh, setRefresh] = useState(true);

	const [isOpen, setIsOpen] = useState(false);

	const [commentsOpen, setCommentsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const toggleComments = () => {
		setCommentsOpen(!commentsOpen);
	};

	return (
		<Wrapper>
			<Navbar graduateEmail={user_email} />
			<section className="gradPlanPage">
				<main role="main" className="elementsSection">
					<p className="elementsText">
						Welcome to your planning center, from here, you can view and add new
						tasks to be done.
					</p>
					<div className="elements">
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
									<b>Fill in task details</b>
									<TaskForm
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
										senderEmail={user_email}
										email={user_email}
										id={elementTasksId}
									/>
								</>
							}
							handleClose={toggleComments}
						/>
					)}
					<Tasks
						userEmail={user_email}
						elementId={elementTasksId}
						refresh={refresh}
						refreshFunc={() => setRefresh(!refresh)}
					/>
				</div>
			</section>
		</Wrapper>
	);
};

MyPlan.propTypes = {
	user_email: PropTypes.string,
};

export default MyPlan;
