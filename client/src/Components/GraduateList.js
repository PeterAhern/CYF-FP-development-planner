import React, { useState, useEffect, useCallback } from "react";
import "./GraduateList.css";

const GraduateList = () => {

    const [gradList, setGradList] = useState({ Graduate1: {graduateName:"Pete"}, Graduate2: {}, Graduate3: {} });

	const fetchGradsHandler = useCallback(async (mentor) => {
		try {
			const response = await fetch(`api/graduates/${mentor}`);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();

			const loadedGrads = [];
			for (const key in data) {
				loadedGrads.push({
					// id: data[key].task_id,
					// title: data[key].task_title,
					// user_email: data[key].user_email,
					// due_date: data[key].due_date,
					// evidence: data[key].evidence,
					// element_id: data[key].element_id,
					// status_id: data[key].status_id,
				});
			}
			setGradList(loadedGrads);
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	useEffect(() => {
			fetchGradsHandler();
		}, [fetchGradsHandler]);

    return (
			<div className="table-container">
				<h1>Graduate Connections</h1>
				<table>
					<thead>
						<tr>
							<th>Graduate Name</th>
							<th>Last Login</th>
							<th>Tasks Added</th>
						</tr>
					</thead>
					<tbody>
						<tr>{gradList.Graduate1.graduateName}</tr>
						<tr></tr>
						<tr></tr>
					</tbody>
				</table>
			</div>
		);

};


export default GraduateList;