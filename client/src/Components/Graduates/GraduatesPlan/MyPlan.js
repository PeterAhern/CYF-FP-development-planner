import { useState, useCallback } from "react";
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
	const [techTasks, setTechTasks] = useState(0);
	const [employerTasks, setEmployerTasks] = useState(0);
	const [essentialTasks, setEssentialTasks] = useState(0);


	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const toggleComments = () => {
		setCommentsOpen(!commentsOpen);
	};

	const fetchTasksNumber = useCallback(async (elementId) => {
		try {
			const response = await fetch(
				`/api/users/${user_email}/${elementId}/tasks`
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			//when no tasks in db, data is sent back as a message (instead of tasks data) with success=true
			if (data.success === true) {
				return "No tasks";
			} else {
				if(elementId===1){
					setTechTasks(data[0].count);
				} else if(elementId===2){
				setEmployerTasks(data[0].count);
				} else if(elementId===3){
				setEssentialTasks(data[0].count);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	}, [user_email]);

	//fetching the number of tasks for each element. Element Id passed into fetch request function as an argument
	fetchTasksNumber(1);
	fetchTasksNumber(2);
	fetchTasksNumber(3);


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
							id="technicalButton"
							className="elementButton"
							onClick={() => setElementTasksId(1)}
						>
							<div>Technical</div>
							<div>{techTasks} Tasks</div>
						</button>

						<button
							id="employabiltyButton"
							className="elementButton"
							onClick={() => setElementTasksId(2)}
						>
							<div>Employabilty</div>
							<div>{employerTasks} Tasks</div>
						</button>
						<button
							id="essentialSkillsButton"
							className="elementButton"
							onClick={() => setElementTasksId(3)}
						>
							<div>Essential Skills</div>
							<div>{essentialTasks} Tasks</div>
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
