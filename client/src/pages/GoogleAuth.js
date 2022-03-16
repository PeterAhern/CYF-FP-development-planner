import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import Navbar from "../Components/Header/Navbar/Navbar";

import "./GoogleAuth.css";

const GoogleAuth = () => {
    const [showLoginButton, setShowLoginButton] = useState(true);

    const [showLogoutButton, setShowLogoutButton] = useState(false);

    const [currClient, setCurrClient] = useState({});




    const clientId =
			"95684876551-fj4hnag0icgcv1eue8laeugstgjln26c.apps.googleusercontent.com";

    const onLoginSuccess = (res) => {
        console.log("Login Success: ", res.profileObj);
        setShowLoginButton(false);
        setShowLogoutButton(true);
        setCurrClient(()=>res.profileObj);
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
								alt="client google account display"
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