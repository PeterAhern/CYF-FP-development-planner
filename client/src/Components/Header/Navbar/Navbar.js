import classes from "./Navbar.module.css";

// import NavItem from "./NavItem";

import NavItem from "../Navbar/NavItem";
import DropdownMenu from "../Navbar/DropdownMenu";

import developmentSvg from "../../../Assets/svg/development.svg";

import navOptions from "../../../Assets/svg/selectDropdown.svg";
import Goal from "./Goal";



const Navbar = () => {
    return (
			<nav className={classes.navbar}>
				<ul className={classes.navbarNav}>
					<Goal />
					<NavItem navText="Dev Planner" href="/myPlan" icon={developmentSvg} />
					<NavItem navText="Options" icon={navOptions}>
						<DropdownMenu />
					</NavItem>
				</ul>
			</nav>
		);
};

export default Navbar;