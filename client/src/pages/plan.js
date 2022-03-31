import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Navigate } from "react-router-dom";

import { Wrapper } from "./plan.styles";

import MyPlan from "../Components/Graduates/GraduatesPlan/MyPlan";
import MentorsHome from "../Components/Mentors/MentorsHome/MentorsHome";

export default function Plan() {
	const [currUser, setCurrUser] = useState({ role: "", user_email: "" });
	const [redirect, setRedirect] = useState(false);

	console.log(currUser);
	Axios.defaults.withCredentials = true;
	useEffect(() => {
		Axios.get("/api/login").then((response) => {
			console.log(response.data.user);
			if (response.data.loggedIn == true) {
				setRedirect(false);
				setCurrUser((prev) => {
					const stateUser = { ...prev };
					stateUser.role = response.data.user.mentor_access ? "mentor" : "grad";
					stateUser.user_email = response.data.user.user_email;
					return stateUser;
				});
			} else {
				setRedirect(true);
			}
		});
	}, []);
	return (
		<Wrapper>
			{redirect && <Navigate to="/" />}
			{currUser.role === "grad" && <MyPlan user_email={currUser.user_email} />}
			{currUser.role === "mentor" && (
				<MentorsHome user_email={currUser.user_email} />
			)}
		</Wrapper>
	);
}
