import classes from "./Navbar.module.css";

// import NavItem from "./NavItem";

import NavItem from "../Navbar/NavItem";
import DropdownMenu from "../Navbar/DropdownMenu";

import developmentSvg from "../../Assets/svg/development.svg";

import navOptions from "../../Assets/svg/selectDropdown.svg";



const Navbar = () => {
    return (
			<nav className={classes.navbar}>
				<ul className={classes.navbarNav}>
					<NavItem href="/about/this/site" navText="Dev Planner" icon={developmentSvg} />
					<NavItem icon={navOptions}>
						<DropdownMenu />
					</NavItem>
				</ul>
			</nav>
		);
};

export default Navbar;