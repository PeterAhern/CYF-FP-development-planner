import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { MyPlanStyles } from "./MyPlan.styles";
// import Card from "../../UI/Card/Card";

// Components
import Navbar from "../../Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
import TaskForm from "../../TaskForm/TaskForm";
import PopUpForm from "../../Tasks/PopUpForm";
import MentorsComment from "../../Mentors/MentorFeedback/MentorsComment";
import * as Components from "../../UI/Button/Button";
import Goal from "../../Header/Navbar/Goal";
// import Back from "../../../Assets/svg/back.svg";


const MyPlan = ({ user_email }) => {
	const [elementTasksId, setElementTasksId] = useState(1);
	const [refresh, setRefresh] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [commentsOpen, setCommentsOpen] = useState(false);
	const [techTasks, setTechTasks] = useState(0);
	const [employerTasks, setEmployerTasks] = useState(0);
	const [essentialTasks, setEssentialTasks] = useState(0);

	const [fixedTasksSectionSelected, setFixedTasksSectionSelected] = useState(false);

	const [windowDimension, detectHW] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener("resize", detectSize);

		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windowDimension]);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const toggleComments = () => {
		setCommentsOpen(!commentsOpen);
	};

	const fetchTasksNumber = useCallback(
		async (elementId) => {
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
					if (elementId === 1) {
						setTechTasks(data[0].count);
					} else if (elementId === 2) {
						setEmployerTasks(data[0].count);
					} else if (elementId === 3) {
						setEssentialTasks(data[0].count);
					}
				}
			} catch (error) {
				console.log(error.message);
			}
		},
		[user_email]
	);

	const returnToElementButtonClickHandler = () => setFixedTasksSectionSelected(false);

	//fetching the number of tasks for each element. Element Id passed into fetch request function as an argument
	fetchTasksNumber(1);
	fetchTasksNumber(2);
	fetchTasksNumber(3);

	return (
		<MyPlanStyles>
			<Navbar graduateEmail={user_email} />
			<Goal graduateEmail={user_email} />
			<section className="gradPlanPage">
				<main
					role="main"
					className={
						windowDimension.winWidth > 500
							? "elementsSection"
							: !fixedTasksSectionSelected
							? "fixedElementsButtonsSelected"
							: "fixedElementsButtonsUnSelected"
					}
				>
					<p className="elementsText">
						Welcome to your planning centre. You can view, edit and add new
						tasks to help you organise your career development.
					</p>
					<div className="elementsButtonsSection">
						<button
							id="technicalButton"
							value="technicalButton"
							className="elementButton"
							onClick={() => {
								if (windowDimension.winWidth < 500) {
									setFixedTasksSectionSelected(true);
								}
								setElementTasksId(1);
							}}
						>
							<div>Technical</div>
							<div>{techTasks} Tasks</div>
						</button>

						<button
							id="employabiltyButton"
							value="employabiltyButton"
							className="elementButton"
							onClick={() => {
								if (windowDimension.winWidth < 500) {
									setFixedTasksSectionSelected(true);
								}
								setElementTasksId(2);
							}}
						>
							<div>Employability</div>
							<div>{employerTasks} Tasks</div>
						</button>
						<button
							id="essentialSkillsButton"
							value="essentialSkillsButton"
							className="elementButton"
							onClick={() => {
								if (windowDimension.winWidth < 500) {
									setFixedTasksSectionSelected(true);
								}
								setElementTasksId(3);
							}}
						>
							<div>Essential Skills</div>
							<div>{essentialTasks} Tasks</div>
						</button>
					</div>
				</main>

				<div
					className={
						windowDimension.winWidth > 500
							? "tasksSection"
							: !fixedTasksSectionSelected
							? "fixedTasksSectionUnSelected"
							: "fixedTasksSectionSelected"
					}
				>
					<div className="elementTasksHeading">
						{fixedTasksSectionSelected && (
							<button
								className="returnToElementsButton"
								onClick={returnToElementButtonClickHandler}
							>
								Go Back
							</button>
						)}
						{elementTasksId === 1
							? "Technical"
							: elementTasksId === 2
							? "Employability"
							: "Essential Skills"}{" "}
						Tasks
					</div>
					<div className="overallButtons">
						<Components.Button
							onClick={togglePopup}
							className="addNewTaskButton"
						>
							+ New Task
						</Components.Button>
						{isOpen && (
							<PopUpForm
								className="PopUp"
								content={
									<>
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

						{!isOpen && (
							<Components.GhostButton
								className="viewFeedbackButton"
								onClick={toggleComments}
							>
								Feedback
							</Components.GhostButton>
						)}
						{commentsOpen && (
							<PopUpForm
								content={
									<MentorsComment
										refresh={refresh}
										refreshFunc={() => setRefresh(!refresh)}
										senderEmail={user_email}
										email={user_email}
										id={elementTasksId}
									/>
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
