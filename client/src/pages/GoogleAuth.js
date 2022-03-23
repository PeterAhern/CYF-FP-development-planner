import React, { useState, useCallback } from "react";
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

	const addUser = useCallback(async (email) => {
		console.log(email);
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				user_email: email,
				mentor_access: false,
			}),
		};
		console.log(requestOptions);
		const response = await fetch(
			"/api/users",
			requestOptions
		);
		console.log(response.body.mentor_access);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
	}, []);

		// useEffect( () => {
		// 	if (currClient.email !== undefined) {
		// 		addUser(currClient.email);
		// 	}
		// }, [addUser, currClient.email]);

    const clientId =
			"95684876551-fj4hnag0icgcv1eue8laeugstgjln26c.apps.googleusercontent.com";

    const onLoginSuccess = (res) => {
        console.log("Login Success: ", res.profileObj);
        setShowLoginButton(false);
        setShowLogoutButton(true);
        setCurrClient(()=>res.profileObj);
		addUser(res.profileObj.email);
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
						<h3>Login with your Google Account</h3>
						<GoogleLogin
							clientId={clientId}
							buttonText="Sign In"
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
							{/* <GoogleLogout
								clientId={clientId}
								buttonText="Logout"
								onLogoutSuccess={onSignoutSuccess}
							></GoogleLogout> */}
							<Link to="/myPlan">
								<button className="btn btn-danger m-5">
									Take me to my plan
								</button>
							</Link>
						</div>
					</main>
				)}
			</div>
		);
};

export default GoogleAuth;