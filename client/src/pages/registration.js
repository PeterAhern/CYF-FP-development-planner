import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import Navbar from "../Components/Header/Navbar/Navbar";

import LandingCanvas from "../Components/MobileComponents/Canvas/LandingCanvas";
import Register from "../Components/LandingComponents/Register";

export default function Registration() {

	const [userEmail, setUserEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginStatus, setLoginStatus] = useState({
		status: false,
		loginResult: "",
	});

	Axios.defaults.withCredentials = true;

	// regex from StackOverflow (https://stackoverflow.com/questions/7635533/validate-email-address-textbox-using-javascript)
	// const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;



	const loginSubmitHandler = (e) => {
		e.preventDefault();
		Axios.post("/api/login", {
			user_email: userEmail,
			password: password,
		}).then((response) => {
			console.log(response);
			if (response.data.message) {
				setLoginStatus((prev) => {
					const currLoginStatus = { ...prev };
					currLoginStatus.status = false;
					currLoginStatus.loginResult = response.data.message;
					return currLoginStatus;
				});
			} else {
				setLoginStatus((prev) => {
					const currLoginStatus = { ...prev };
					currLoginStatus.status = true;
					currLoginStatus.loginResult = response.data.user_email;

					return currLoginStatus;
				});
			}
		});
	};

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

	const logoutHandler = (e) => {
		e.preventDefault();
		setLoginStatus((prev) => {
			const currLoginStatus = { ...prev };
			currLoginStatus.status = false;
			currLoginStatus.loginResult = "";
			return currLoginStatus;
		});
	};

	return (
		<>
			{!loginStatus.status && (
				<div className="App">
					<LandingCanvas />
					<Register />					
					<h1>Elemental Planner</h1>
					<h2>Organising your elements to success</h2>
					<form className="login" onSubmit={loginSubmitHandler}>
						<h1>Login</h1>
						<input
							type="text"
							placeholder="User Email..."
							onChange={(e) => {
								setUserEmail(e.target.value);
							}}
						/>
						<input
							type="password"
							placeholder="Password..."
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<button> Login </button>
					</form>
				</div>
			)}
			{loginStatus.status && (
				<div>
					<Navbar logoutHandler={logoutHandler} />
					<h1>Welcome back</h1>
					<Link to="/plan">
						<button>Take me to my plan</button>
					</Link>
				</div>
			)}
		</>
	);
}