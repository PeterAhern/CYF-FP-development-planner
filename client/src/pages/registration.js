import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { Navigate } from "react-router-dom";
import LandingCanvas from "../Components/MobileComponents/Canvas/LandingCanvas";
import Register from "../Components/LandingComponents/Register";
import Login from "../Components/LandingComponents/Login";
import * as Components from "../Components/LandingComponents/landingComponents";
import "../Components/LandingComponents/landing.css";

export default function Registration() {
	const [signIn, toggle] = useState(true);

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

	return (
		<>
			{!loginStatus.status && (
				<div className="login_container">
					<div className="landingHeader">
						<h1>Elemental Planner</h1>
						<h2>Organising your elements to success</h2>
					</div>
					<LandingCanvas />
					<Components.Container>
						<Components.SignUpContainer signingIn={signIn}>
							<Register setLoginStatus={setLoginStatus} />
						</Components.SignUpContainer>
						<Components.SignInContainer signingIn={signIn}>
							<Login setLoginStatus={setLoginStatus} />
						</Components.SignInContainer>
						<Components.OverlayContainer signingIn={signIn}>
							<Components.Overlay signingIn={signIn}>
								<Components.LeftOverlayPanel signingIn={signIn}>
									<Components.Title>Welcome Back!</Components.Title>
									<Components.Paragraph>
										Please login with your personal info
									</Components.Paragraph>
									<Components.GhostButton onClick={() => toggle(true)}>
										Sign In
									</Components.GhostButton>
								</Components.LeftOverlayPanel>
								<Components.RightOverlayPanel signingIn={signIn}>
									<Components.Title>
										Get started with Elemental
									</Components.Title>
									<Components.Paragraph>
										Fill out your details to get started organising your
										elements to success!
									</Components.Paragraph>
									<Components.GhostButton onClick={() => toggle(false)}>
										Sign Up
									</Components.GhostButton>
								</Components.RightOverlayPanel>
							</Components.Overlay>
						</Components.OverlayContainer>
					</Components.Container>
				</div>
			)}
			{loginStatus.status && <Navigate to="/plan" />}
		</>
	);
}
