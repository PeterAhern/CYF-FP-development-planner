import React, { useState, useEffect, useCallback } from "react";
import "./GraduateList.css";

const GraduateList = ({ mentorEmail, addGradRefresh, gradRefreshFunc }) => {
	const [gradList, setGradList] = useState({});
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
		body: JSON.stringify({ }),
	};

	const removeGraduate = async (e) => {
		let mentor = mentorEmail;
		let graduate = e.target.value;
		const response = await fetch(`api/users/mentors/${mentor}/${graduate}`, requestOptions);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		gradRefreshFunc();
	};

	let gradListContent = (
		<h1>No graduate connections, search and add graduates</h1>
	);
	if (gradList.Graduate1 !== null) {
		gradListContent = (
			<table>
				<thead>
					<tr>
						<th>Graduate Name</th>
						<th>Last Login</th>
						<th>Tasks Added</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							{gradList.Graduate1}
							<button value={gradList.Graduate1} onClick={removeGraduate}>
								Remove
							</button>
						</td>
					</tr>
					<tr>
						<td>
							{gradList.Graduate2}
							<button value={gradList.Graduate2} onClick={removeGraduate}>
								Remove
							</button>
						</td>
					</tr>
					<tr>
						<td>
							{gradList.Graduate3}
							<button value={gradList.Graduate3} onClick={removeGraduate}>
								Remove
							</button>
						</td>
					</tr>
				</tbody>
			</table>
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
