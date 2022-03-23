import React, { useState, useEffect, useCallback } from "react";
import "./GraduateList.css";

const GraduateList = ({ addGradRefresh }) => {

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
					Graduate1: data[0].graduate_1,
					Graduate2: data[0].graduate_2,
					Graduate3: data[0].graduate_3,
				});
			setGradList(loadedGrads[0]);
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	useEffect(() => {
			fetchGradsHandler(user);
		}, [fetchGradsHandler, addGradRefresh]);

		console.log(gradList.Graduate1);
		let gradListContent = <h1>No graduate connections, search and add graduates</h1>;
	if (gradList.Graduate1!==null) {
			gradListContent = <table>
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
				</table>;
		}

		console.log(gradListContent);

    return (
			<div className="table-container">
				<h1>Graduate Connections</h1>
				{gradListContent}
			</div>
		);
};


export default GraduateList;