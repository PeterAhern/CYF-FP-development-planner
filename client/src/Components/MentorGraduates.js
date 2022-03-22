// import { useState } from "react";

const MentorGraduate = (props) => {
	// const [graduate, setGraduate] = useState({ graduate: " " });

	const requestOptions = {
		method: "Put",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ graduate: props.user }),
	};

	const addGraduate = async () => {
		let mentor = "linda@gmail";
		//just for testing
		const response = await fetch(`api/users/mentors/${mentor}`, requestOptions);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	};

	return (
		<div>
			<h4>
				{props.user} <button onClick={addGraduate}>Connect</button>
			</h4>
		</div>
	);
};
export default MentorGraduate;
