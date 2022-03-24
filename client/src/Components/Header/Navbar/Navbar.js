import NavItem from "../Navbar/NavItem";
import DropdownMenu from "../Navbar/DropdownMenu";

import developmentSvg from "../../../Assets/svg/development.svg";

import navOptions from "../../../Assets/svg/selectDropdown.svg";
import Goal from "./Goal";

// import SideDrawerNavigation from "./SideDrawerNavigation/SideDrawerNavigation";

import React, { useState } from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
} from "./Navbar.style";

const Navbar = ({ logoutHandler }) => {
	const [toggleHamburgerMenu, setToggleHamburgerMenu] = useState(false);

	const toggleHamburgerMenuHandler = () => setToggleHamburgerMenu(!toggleHamburgerMenu);
	return (
		<>
			<Nav>
				<Bars onClick={toggleHamburgerMenuHandler} />
				{/* {toggleHamburgerMenu && <SideDrawerNavigation />} */}

				<Goal />
				<ul className="navbarNav">
					<NavMenu>
						<NavItem
							navText="Dev Planner"
							href="/plan"
							icon={developmentSvg}
						/>
						<NavItem navText="Options" icon={navOptions}>
							<DropdownMenu logoutHandler={logoutHandler} />
						</NavItem>
					</NavMenu>
				</ul>
			</Nav>
		</>
	);

};

export default Navbar;


/*
	<ul className={"navbarNav"}>
				<Goal />
				<NavItem navText="Dev Planner" href="/plan" icon={developmentSvg} />
				<NavItem navText="Options" icon={navOptions}>
					<DropdownMenu
						logoutHandler={logoutHandler}
					/>
				</NavItem>
			</ul>

*/