

import GoogleAuth from "./GoogleAuth";

import "./Landing.css";

const Landing = () => {
	const userEmail = (email) => email;


	return (
		<div className="g-signin">
			<h1>Elemental Planner</h1>
			<h2>Organising your elements to success</h2>
			<GoogleAuth userEmail={userEmail} />
		</div>
	);
};

export default Landing;
