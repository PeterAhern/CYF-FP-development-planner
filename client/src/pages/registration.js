import React, { useEffect, useState } from "react";
import { RegistrationStyles } from "./registration.styles";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import Register from "../Components/LandingComponents/Register";
import Login from "../Components/LandingComponents/Login";
import * as Components from "../Components/LandingComponents/landingComponents";
import Footer from "../Components/LandingComponents/Footer";


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
		<RegistrationStyles>
			<div className="upperPartLandingPage">
				{!loginStatus.status && (
					<div className="login_container">
						<div className="landingHeader">
							<h1>Elemental Planner</h1>
							<h2>Organising your elements to success.</h2>
						</div>
						<div className="landingLoginAndSignupSection">
							<Components.Container className="loginComp">
								<Components.SignUpContainer signingIn={signIn}>
									<Register setLoginStatus={setLoginStatus} />
								</Components.SignUpContainer>
								<Components.SignInContainer signingIn={signIn}>
									<Login setLoginStatus={setLoginStatus} />
								</Components.SignInContainer>
								<Components.OverlayContainer signingIn={signIn}>
									<Components.Overlay signingIn={signIn}>
										<Components.LeftOverlayPanel signingIn={signIn}>
											<Components.Title>
												Start with Elemental...
											</Components.Title>
											<Components.Paragraph>
												Sign up to begin organising your elements to success!
											</Components.Paragraph>
											<Components.Paragraph2>
												Already registered?
											</Components.Paragraph2>
											<Components.GhostButton3 onClick={() => toggle(true)}>
												Sign In
											</Components.GhostButton3>
										</Components.LeftOverlayPanel>
										<Components.RightOverlayPanel signingIn={signIn}>
											<Components.Title>Welcome Back!</Components.Title>
											<Components.Paragraph3>
												Sign in with your personal details.
											</Components.Paragraph3>
											<Components.Paragraph2>
												New to elemental?
											</Components.Paragraph2>
											<Components.GhostButton2 onClick={() => toggle(false)}>
												Create Account
											</Components.GhostButton2>
										</Components.RightOverlayPanel>
									</Components.Overlay>
								</Components.OverlayContainer>
							</Components.Container>
						</div>
					</div>
				)}
				{loginStatus.status && <Navigate to="/plan" />}
			</div>
			<div className="footerPartLandingPage">
				<Footer />
			</div>
		</RegistrationStyles>
	);
}
