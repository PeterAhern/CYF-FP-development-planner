import classes from "./DropdownMenu.module.css";
import { GoogleLogout } from "react-google-login";

import developmentIcon from "../../../Assets/svg/development.svg";
import logInOutSvg from "../../../Assets/svg/login-out.svg";
import Card from "../../UI/Card/Card";
import { Link } from "react-router-dom";

// Component
import DropdownItem from "./DropdownItem";

const DropdownMenu = () => {
	const clientId =
		"95684876551-fj4hnag0icgcv1eue8laeugstgjln26c.apps.googleusercontent.com";

    return (
			<Card>
				<div className={classes.dropdown}>
					<DropdownItem href="/myPlan" leftIcon={developmentIcon}>
						My Profile
					</DropdownItem>
					<DropdownItem href="/" leftIcon={logInOutSvg}>

							<GoogleLogout
								clientId={clientId}
								buttonText="Logout"
							></GoogleLogout>

					</DropdownItem>
				</div>
			</Card>
		);
};

export default DropdownMenu;