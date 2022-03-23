import React, { useState, useEffect, useCallback } from "react";
import "./GraduateList.css";

const GraduateList = () => {

	const user = "mentor@gmail.com";

    const [gradList, setGradList] = useState({});
	const fetchGradsHandler = useCallback(async (mentor) => {
		try {
			const response = await fetch(`api/graduates/${mentor}`);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			const loadedGrads = [];
				loadedGrads.push({
					Graduate1: data[0].graduate_id_1,
					Graduate2: data[0].graduate_id_2,
					Graduate3: data[0].graduate_id_3,
				});
				console.log(loadedGrads[0]);
			setGradList(loadedGrads[0]);
			// console.log(gradList[0]);
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	useEffect(() => {
			fetchGradsHandler(user);
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
						<tr>{gradList.Graduate1}</tr>
						<tr>{gradList.Graduate2}</tr>
						<tr>{gradList.Graduate3}</tr>
					</tbody>
				</table>
			</div>
		);

};


export default GraduateList;