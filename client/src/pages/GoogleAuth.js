import React, { useState, useEffect, useCallback } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import Navbar from "../Components/Header/Navbar/Navbar";

import "./GoogleAuth.css";

const GoogleAuth = (props) => {
    const [showLoginButton, setShowLoginButton] = useState(true);

    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const [currClient, setCurrClient] = useState({});
	console.log("look here: ",currClient.imageUrl);
	props.userEmail(currClient.email);

	const addUser = useCallback(async () => {

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				user_email: currClient.email,
				mentor_access: false,
			}),
		};
		const response = await fetch(
			"https://elemental-planner.herokuapp.com/api/users",
			requestOptions
		);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	}, [currClient]);

	useEffect(() => {
		addUser();
	}, [addUser]);

    const clientId =
			"95684876551-fj4hnag0icgcv1eue8laeugstgjln26c.apps.googleusercontent.com";

    const onLoginSuccess = (res) => {
        console.log("Login Success: ", res.profileObj);

        setShowLoginButton(false);
        setShowLogoutButton(true);
        setCurrClient(()=>res.profileObj);
		addUser();
		console.log(currClient);
    };

    const onLoginFailure = (res) => {
		console.log("Login Failed: ", res);
    };

    const onSignoutSuccess = () => {
        alert("You have been signed out successfully");
        setShowLoginButton(true);
		setShowLogoutButton(false);
    };

    return (
			<div>
				{showLoginButton && (
					<div>
						<h1>Sign in !</h1>
						<GoogleLogin
							clientId={clientId}
							buttonText="Login"
							onSuccess={onLoginSuccess}
							onFailure={onLoginFailure}
							cookiePolicy={"single_host_origin"}
						/>
					</div>
				)}

				{showLogoutButton && (
					<main>
						<Navbar />
						<div>
							<h1>
								Hello, {`${currClient.givenName} ${currClient.familyName}`}
							</h1>
							<h2>{currClient.email}</h2>
							<h2>Google Id: {currClient.googleId}</h2>
							<img
								className="clientProfileImage"
								src={`${currClient.imageUrl}`}
								alt="profile for member"
							/>
							<GoogleLogout
								clientId={clientId}
								buttonText="Logout"
								onLogoutSuccess={onSignoutSuccess}
							></GoogleLogout>
							<Link to="/myPlan">
								<button>Take me to my plan</button>
							</Link>
						</div>
					</main>
				)}
			</div>
		);
};

export default GoogleAuth;