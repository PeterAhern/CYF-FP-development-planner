// import { useState } from "react";
import { MentorGraduatesStyles } from "./MentorGraduates.styles";

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
		<MentorGraduatesStyles>
				{user} <button onClick={addGraduate}>Connect</button>
		</MentorGraduatesStyles>
	);
};
export default MentorGraduate;
