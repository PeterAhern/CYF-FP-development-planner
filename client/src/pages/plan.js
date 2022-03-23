import React, { useEffect, useState } from "react";
import Axios from "axios";

import MyPlan from "../Components/Graduates/GraduatesPlan/MyPlan";
import MentorsHome from "../Components/Mentors/MentorsHome/MentorsHome";

export default function Main() {
	const [role, setRole] = useState("");
	console.log(role);

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		Axios.get("/api/login").then((response) => {
			if (response.data.loggedIn == true) {
				setRole(() => response.data.user.mentor_access ? "mentor" : "grad");
			}
		});
	}, []);

	return (
		<div>
			{role == "grad" && <MyPlan /> }
			{role == "mentor" && <MentorsHome />}
		</div>
	);
}
