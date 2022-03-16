

import GoogleAuth from "./GoogleAuth";

import "./Landing.css";


const Landing = () => {
	return (<div className="g-signin">
		<GoogleAuth />
	</div>);
};

export default Landing;
