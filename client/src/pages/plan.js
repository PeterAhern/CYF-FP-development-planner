import React, { useEffect, useState } from "react";
import Axios from "axios";

import MyPlan from "../Components/Graduates/GraduatesPlan/MyPlan";
import MentorsHome from "../Components/Mentors/MentorsHome/MentorsHome";

export default function Plan() {
	const [currUser, setCurrUser] = useState({ role: "", user_email: "" });

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		Axios.get("/api/login").then((response) => {
			if (response.data.loggedIn == true) {
				setCurrUser((prev) => {
					const stateUser = { ...prev };
					stateUser.role = response.data.user.mentor_access ? "mentor" : "grad";
					stateUser.user_email = response.data.user.user_email;
					// loggedInUserEmail(response.data.user.user_email);
					return stateUser;
				});
			}
		});
	}, []);

	return (
		<div>
			{currUser.role === "grad" && (
				<MyPlan graduateEmail={currUser.user_email} />
			)}
			{currUser.role === "mentor" && (
				<MentorsHome mentorEmail={currUser.user_email} />
			)}
		</div>
	);
}
