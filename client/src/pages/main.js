import React, { useEffect, useState } from "react";
import Axios from "axios";

import GraduatesHome from "../Components/Graduates/GraduatesHome/GraduatesHome";
import MentorsHome from "../Components/Mentors/MentorsHome/MentorsHome";

export default function Main() {
	const [role, setRole] = useState("");

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		Axios.get("/login").then((response) => {
			if (response.data.loggedIn == true) {
				setRole(response.data.user[0].role);
			}
		});
	}, []);

	return (
		<div>
			{role == "grad" && <GraduatesHome />}
			{role == "mentor" && <MentorsHome />}
		</div>
	);
}
