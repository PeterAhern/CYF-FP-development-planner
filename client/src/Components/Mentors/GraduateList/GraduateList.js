import React, { useState, useEffect, useCallback } from "react";
import "./GraduateList.css";

const GraduateList = ({ mentorEmail, addGradRefresh }) => {
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

	console.log(gradList.Graduate1);
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
						<td>{gradList.Graduate1}</td>
					</tr>
					<tr>
						<td>{gradList.Graduate2}</td>
					</tr>
					<tr>
						<td>{gradList.Graduate3}</td>
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