import classes from "./DropdownMenu.module.css";


import developmentIcon from "../../../Assets/svg/development.svg";
import logInOutSvg from "../../../Assets/svg/login-out.svg";
import Card from "../../UI/Card/Card";

// Component
import DropdownItem from "./DropdownItem";
const DropdownMenu = ({ logoutHandler }) => {
	return (
		<Card>
			<div className={classes.dropdown}>
				<DropdownItem href="/plan" leftIcon={developmentIcon}>
					Elements
				</DropdownItem>
				<DropdownItem href="/profile" leftIcon={developmentIcon}>
					My Profile
				</DropdownItem>
				<DropdownItem href="/" leftIcon={logInOutSvg}>
					<button onClick={logoutHandler}>Logout</button>
				</DropdownItem>
			</div>
		</Card>
	);
};

export default DropdownMenu;