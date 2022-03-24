// import { useState } from "react";

const MentorGraduate = ( { user, gradRefreshFunc, mentorEmail  } ) => {

	const requestOptions = {
		method: "Put",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ graduate: user }),
	};

	const addGraduate = async () => {
		let mentor = mentorEmail;
		const response = await fetch(`api/users/mentors/${mentor}`, requestOptions);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		gradRefreshFunc();
	};

	return (
		<div>
			<h4>
				{user} <button onClick={addGraduate}>Connect</button>
			</h4>
		</div>
	);
};
export default MentorGraduate;
