

import GoogleAuth from "./GoogleAuth";

import "./Landing.css";


const Landing = () => {
	const userEmail = (email) => email;
	return (
		<div className="g-signin">
			<GoogleAuth userEmail={userEmail} />
		</div>
	);
};

export default Landing;
