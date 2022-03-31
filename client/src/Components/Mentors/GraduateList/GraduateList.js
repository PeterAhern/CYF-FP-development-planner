import React, { useState, useEffect, useCallback } from "react";
import GraduateElement from "../MentorFeedback/GraduateElement";

import { GraduateListStyle } from "./GraduateList.styles";
import Popup from "../MentorFeedback/Popup";
import { PopupStyles } from "../MentorFeedback/Popup.styles";
import { MentorsHomeStyle } from "../MentorsHome/MentorsHome.styles";
import { MyPlanStyles } from "../../Graduates/GraduatesPlan/MyPlan.styles";

const GraduateList = ({ mentorEmail, addGradRefresh, gradRefreshFunc }) => {
	const [gradList, setGradList] = useState({});
	const [buttonPopup, setButtonPopup] = useState(false);
	const [user, setUser] = useState("");
	const [nameClicked, setNameClicked] = useState(false);
	const clickHandler = (e) => {
		setUser(e.target.value);
		setButtonPopup(true);
		setNameClicked(!nameClicked);
	};
	const fetchGradsHandler = useCallback(async () => {
		try {
			const response = await fetch(`api/graduates/${mentorEmail}`);

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
	}, [mentorEmail]);

	useEffect(() => {
		fetchGradsHandler();
	}, [fetchGradsHandler, addGradRefresh, mentorEmail]);

	const requestOptions = {
		method: "Put",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({}),
	};

	const removeGraduate = async (e) => {
		let mentor = mentorEmail;
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
	if (
		gradList.Graduate1 !== null ||
		gradList.Graduate2 !== null ||
		gradList.Graduate3 !== null
	) {
		return (
			<MyPlanStyles>
				<GraduateListStyle>
					<PopupStyles>
						<MentorsHomeStyle>
							<div className=" mentees elementsSection ">
								<div className="elementsText">
									<p> Welcome Mentor!</p>
									<p> Connect with graduates, give feedback, support growth!</p>
								</div>

								{gradList.Graduate1 && (
									<button
										className="elementButton button"
										onClick={clickHandler}
										value={gradList.Graduate1}
									>
										{gradList.Graduate1}
									</button>
								)}
								{gradList.Graduate2 && (
									<button
										className="elementButton"
										onClick={clickHandler}
										value={gradList.Graduate2}
									>
										{gradList.Graduate2}
									</button>
								)}
								{gradList.Graduate3 && (
									<button
										className="elementButton"
										onClick={clickHandler}
										value={gradList.Graduate3}
									>
										{gradList.Graduate3}
									</button>
								)}
							</div>
							<button
								value={user}
								onClick={removeGraduate}
								className="comment btn btn-danger remove"
							>
								Remove
							</button>
							{!nameClicked && (
								<div className="gradElement">
									<GraduateElement
										name={"Technical"}
										id={1}
										graduateEmail={gradList.Graduate1}
										mentorEmail={mentorEmail}
										clicked={clickHandler}
									/>
									<GraduateElement
										name={"Job Search"}
										id={2}
										graduateEmail={gradList.Graduate1}
										mentorEmail={mentorEmail}
										clickHandler={clickHandler}
									/>
									<GraduateElement
										name={"Soft Skills"}
										id={3}
										graduateEmail={gradList.Graduate1}
										mentorEmail={mentorEmail}
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
											mentorEmail={mentorEmail}
											clicked={clickHandler}
										/>
										<GraduateElement
											name={"Job Search"}
											id={2}
											graduateEmail={user}
											mentorEmail={mentorEmail}
											clickHandler={clickHandler}
										/>
										<GraduateElement
											name={"Soft Skills"}
											id={3}
											graduateEmail={user}
											mentorEmail={mentorEmail}
											clickHandler={clickHandler}
										/>
									</div>

									{/* </Popup> */}
								</div>
							)}
						</MentorsHomeStyle>
					</PopupStyles>
				</GraduateListStyle>
			</MyPlanStyles>
		);
	} else {
		return (
			<MyPlanStyles>
				<GraduateListStyle>
					<PopupStyles>
						<MentorsHomeStyle>
							<div className="elementsSection">
								<h1 className="message elementsText">Graduate Connections</h1>
								{gradListContent}
							</div>
						</MentorsHomeStyle>
					</PopupStyles>
				</GraduateListStyle>
			</MyPlanStyles>
		);
	}
};

export default GraduateList;
