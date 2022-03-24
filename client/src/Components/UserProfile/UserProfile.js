import React, { useEffect, useState } from "react";
import Axios from "axios";
import Navbar from "../Header/Navbar/Navbar";
import "./UserProfile.css";

const UserProfile = () => {
	const [loginStatus, setLoginStatus] = useState({
		status: false,
		loginResult: "",
	});

	useEffect(() => {
		Axios.get("/api/login").then((response) => {
			if (response.data.loggedIn == true) {
				setLoginStatus((prev) => {
					const currLoginStatus = { ...prev };
					currLoginStatus.status = true;
					currLoginStatus.loginResult = response.data.user_email;
					return currLoginStatus;
				});
			}
		});
	}, []);
	return (
		<>
			{loginStatus.status && (<main>
				<Navbar />

				<h1>hello User</h1>
			</main>)}
		</>
	);
};

export default UserProfile;
