import React, { useState, useEffect, useCallback } from "react";
import GraduateElement from "../MentorFeedback/GraduateElement";
import Navbar from "../../Header/Navbar/Navbar";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
// import GraduateList from "../GraduateList/GraduateList";
import { MentorsHomeStyle } from "./MentorsHome.styles";

import TaskForm from "../../TaskForm/TaskForm";
import PopUpForm from "../../Tasks/PopUpForm";
import GraduateTasks from "../MentorFeedback/GraduateTasks";
import MentorsComment from "../MentorFeedback/MentorsComment";
import * as Components from "../../UI/Button/Button";

const MentorsHome = ({ user_email }) => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);
	const [clicked, setClicked] = useState(1);

	const [gradList, setGradList] = useState({});
	// const [buttonPopup, setButtonPopup] = useState(false);
	const [user, setUser] = useState("");
	const [nameClicked, setNameClicked] = useState(false);
	const [comment, setComment] = useState(false);
	const [refresh, setRefresh] = useState(true);

	const [assignTaskClicked, setAssignTaskClicked] = useState(false);

	const [isOpen, setIsOpen] = useState(false);

	const clickHandler = (e) => {
		setUser(e.target.value);
		// setButtonPopup(true);
		setNameClicked(!nameClicked);
	};

	const gradRefreshFunc = () => setAddGradRefresh(!addGradRefresh);
	const fetchGradsHandler = useCallback(async () => {
		try {
			const response = await fetch(`api/graduates/${user_email}`);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			const loadedGrads = [];
			loadedGrads.push({
				Graduate1: data[0].graduate_1,
				Graduate2: data[0].graduate_2,
				Graduate3: data[0].graduate_3,
			});
			setGradList(loadedGrads[0]);
		} catch (error) {
			console.log(error.message);
		}
	}, [user_email]);

	useEffect(() => {
		fetchGradsHandler();
	}, [fetchGradsHandler, addGradRefresh, user_email]);

	const requestOptions = {
		method: "Put",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({}),
	};

	const removeGraduate = async (e) => {
		let mentor = user_email;
		let graduate = e.target.value;
		const response = await fetch(
			`api/users/mentors/${mentor}/${graduate}`,
			requestOptions
		);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		gradRefreshFunc();
	};

	let gradListContent = (
		<h1 className="message elementsText">
			No graduate connections, search and add graduates
		</h1>
	);

	const assignTaskHandler = () => setAssignTaskClicked(!assignTaskClicked);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};


		return (
			<MentorsHomeStyle>
				<Navbar user_email={user_email} />
				<div className="main">
					<div className="chosenMenteesSection">
						<div className="menteesSection ">
							<div className="elementsText">
								<p> Welcome Mentor!</p>
								<p> Connect with graduates, give feedback, support growth!</p>
							</div>

							{gradList.Graduate1 && (
								<button
									className="gradButton"
									onClick={clickHandler}
									value={gradList.Graduate1}
								>
									{gradList.Graduate1}
								</button>
							)}
							{gradList.Graduate2 && (
								<button
									className="gradButton"
									onClick={clickHandler}
									value={gradList.Graduate2}
								>
									{gradList.Graduate2}
								</button>
							)}
							{gradList.Graduate3 && (
								<button
									className="gradButton"
									onClick={clickHandler}
									value={gradList.Graduate3}
								>
									{gradList.Graduate3}
								</button>
							)}
						</div>
					</div>
					<div className="rightSideDisplaySection">
						<div className="AllMenteesSection">
							<AllGraduates
								mentorEmail={user_email}
								gradRefreshFunc={gradRefreshFunc}
							/>
						</div>
						<section className="graduateElementsDisplaySection">
							{gradList.Graduate1 !== null ||
							gradList.Graduate2 !== null ||
							gradList.Graduate3 !== null ? (
								<section className="graduateElementsSection">
									<button
										value={user}
										onClick={removeGraduate}
										className="removeGraduateButton"
									>
										Remove
									</button>

									{!nameClicked && (
										<div className="gradElement">
											<GraduateElement
												name={"Technical"}
												id={1}
												graduateEmail={gradList.Graduate1}
												mentorEmail={user_email}
												clickHandler={clickHandler}
											/>
											<GraduateElement
												name={"Job Search"}
												id={2}
												graduateEmail={gradList.Graduate1}
												mentorEmail={user_email}
												clickHandler={clickHandler}
											/>
											<GraduateElement
												name={"Soft Skills"}
												id={3}
												graduateEmail={gradList.Graduate1}
												mentorEmail={user_email}
												clickHandler={clickHandler}
											/>
										</div>
									)}

									{nameClicked && (
										<div>
											<div className="gradElement">
												<GraduateElement
													name={"Technical"}
													id={1}
													graduateEmail={user}
													mentorEmail={user_email}
													clickHandler={clickHandler}
													setClicked={setClicked}
													clicked={clicked}
												/>
												<GraduateElement
													name={"Job Search"}
													id={2}
													graduateEmail={user}
													mentorEmail={user_email}
													clickHandler={clickHandler}
													setClicked={setClicked}
													clicked={clicked}
												/>
												<GraduateElement
													name={"Soft Skills"}
													id={3}
													graduateEmail={user}
													mentorEmail={user_email}
													clickHandler={clickHandler}
													setClicked={setClicked}
													clicked={clicked}
												/>
											</div>
										</div>
									)}
								</section>
							) : (
								<div className="elementsSection">
									<h1 className="message elementsText">Graduate Connections</h1>
									{gradListContent}
								</div>
							)}
						</section>
						<section className="graduateButtons">
							<Components.Button
								className="menteeCommentButton"
								onClick={() => setComment(!comment)}
							>
								Feedback
							</Components.Button>

							{comment && (
								<MentorsComment
									senderEmail={user_email}
									email={user}
									id={clicked}
									refresh={refresh}
									refreshFunc={() => setRefresh(!refresh)}
								/>
							)}

							{clicked && (
								<>
									<Components.GhostButton
										className="addNewTaskButton"
										onClick={assignTaskHandler}
									>
										Assign Task
									</Components.GhostButton>
									{assignTaskClicked && (
										<div className="tasksSection">
											<input
												type="button"
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
																	userEmail: user,
																	dueDate: "",
																	evidence: "",
																	elementId: clicked,
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
								</>
							)}
						</section>
						<section className="graduateElementTasksDisplaySection">
							<GraduateTasks
								userEmail={user_email}
								elementId={clicked}
								className="element"
								senderEmail={user}
							/>
						</section>
					</div>
				</div>
			</MentorsHomeStyle>
		);
};
export default MentorsHome;
