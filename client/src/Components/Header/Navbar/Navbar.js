import classes from "./Navbar.module.css";

// import NavItem from "./NavItem";

import NavItem from "../Navbar/NavItem";
import DropdownMenu from "../Navbar/DropdownMenu";

import developmentSvg from "../../../Assets/svg/development.svg";

import navOptions from "../../../Assets/svg/selectDropdown.svg";



const Navbar = () => {
    return (
			<nav className={classes.navbar}>
				<ul className={classes.navbarNav}>
					<NavItem navText="Dev Planner" href="/myPlan" icon={developmentSvg} />
					<NavItem navText="Options" icon={navOptions}>
						<DropdownMenu />
					</NavItem>
				</ul>
			</nav>
		);
};

export default Navbar;