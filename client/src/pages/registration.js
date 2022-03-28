import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
// import { Link } from "react-router-dom";
// import Navbar from "../Components/Header/Navbar/Navbar";
import { Navigate } from "react-router-dom";

import LandingCanvas from "../Components/MobileComponents/Canvas/LandingCanvas";
import Register from "../Components/LandingComponents/Register";
import Login from "../Components/LandingComponents/Login";

export default function Registration() {

	const [loginStatus, setLoginStatus] = useState({
		status: false,
		loginResult: "",
	});

	Axios.defaults.withCredentials = true;

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

	// const logoutHandler = (e) => {
	// 	e.preventDefault();
	// 	setLoginStatus((prev) => {
	// 		const currLoginStatus = { ...prev };
	// 		currLoginStatus.status = false;
	// 		currLoginStatus.loginResult = "";
	// 		return currLoginStatus;
	// 	});
	// };

	return (
		<>
			{!loginStatus.status && (
				<div className="App">
					<LandingCanvas />
					<Register />
					<h1>Elemental Planner</h1>
					<h2>Organising your elements to success</h2>
					<Login setLoginStatus={setLoginStatus} />
				</div>
			)}
			{loginStatus.status && <Navigate to="/plan" />}
		</>
	);
}