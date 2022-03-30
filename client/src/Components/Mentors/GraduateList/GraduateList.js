import React, { useState, useEffect, useCallback } from "react";
import GraduateElement from "../MentorFeedback/GraduateElement";
import "./GraduateList.css";
import Popup from "../MentorFeedback/Popup";
import "../MentorFeedback/Popup.css";
import "../MentorsHome/MentorsHome.css";
import "../../Graduates/GraduatesPlan/MyPlan.css";
const GraduateList = ({ mentorEmail, addGradRefresh, gradRefreshFunc }) => {
	const [gradList, setGradList] = useState({});
	const [buttonPopup, setButtonPopup] = useState(false);
	const [user, setUser] = useState("");
	const clickHandler = (e) => {
		setUser(e.target.value);
		setButtonPopup(true);
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
		<h1>No graduate connections, search and add graduates</h1>
	);
	if (
		gradList.Graduate1 !== null ||
		gradList.Graduate2 !== null ||
		gradList.Graduate3 !== null
	) {
		gradListContent = (
			<div>
				<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
					<div className="element">
						<GraduateElement
							name={"Technical"}
							id={1}
							graduateEmail={user}
							mentorEmail={mentorEmail}
						/>
						<GraduateElement
							name={"Job Search"}
							id={2}
							graduateEmail={user}
							mentorEmail={mentorEmail}
						/>
						<GraduateElement
							name={"Soft Skills"}
							id={3}
							graduateEmail={user}
							mentorEmail={mentorEmail}
						/>
					</div>
				</Popup>
				<div className="elements">
					{gradList.Graduate1 && (
						<button className="elementButton">
							<h1>{gradList.Graduate1}</h1>

							<button value={gradList.Graduate1} onClick={removeGraduate}>
								Remove
							</button>

							<button value={gradList.Graduate1} onClick={clickHandler}>
								Show tasks
							</button>
						</button>
					)}

					{gradList.Graduate2 && (
						<button className="elementButton">
							<h1>{gradList.Graduate2}</h1>

							<button value={gradList.Graduate2} onClick={removeGraduate}>
								Remove
							</button>

							<button value={gradList.Graduate2} onClick={clickHandler}>
								Show tasks
							</button>
						</button>
					)}
					{gradList.Graduate3 && (
						<button className="elementButton">
							<h1>{gradList.Graduate3}</h1>

							<button value={gradList.Graduate3} onClick={removeGraduate}>
								Remove
							</button>

							<button value={gradList.Graduate3} onClick={clickHandler}>
								Show tasks
							</button>
						</button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="table-container">
			<h1>Graduate Connections</h1>
			{gradListContent}
		</div>
	);
};

export default GraduateList;
