import React, { useState } from "react";
import Popup from "reactjs-popup";
import NavItem from "../Navbar/NavItem";
import DropdownMenu from "../Navbar/DropdownMenu";

import developmentSvg from "../../../Assets/svg/development.svg";

import navOptions from "../../../Assets/svg/selectDropdown.svg";
import Goal from "./Goal";

import MobileNav from "./MobileNav/MobileNav";
import BurgerIcon from "./MobileNav/BurgerIcon";



// import SideDrawerNavigation from "./SideDrawerNavigation/SideDrawerNavigation";

import {
	Nav,
	Bars,
	NavMenu,
} from "./Navbar.style";


const styles = {
	fontFamily: "sans-serif",
	textAlign: "center",
	marginTop: "40px",
};
const contentStyle = {
	background: "rgba(255,255,255,0)",
	width: "80%",
	border: "none",
};

const Navbar = ({ logoutHandler }) => {
	const [toggleHamburgerMenu, setToggleHamburgerMenu] = useState(false);

	const toggleHamburgerMenuHandler = () => setToggleHamburgerMenu(!toggleHamburgerMenu);
	return (
		<>
			<Bars>
				<Popup
					modal
					overlayStyle={{ background: "rgba(255,255,255,0.98" }}
					contentStyle={contentStyle}
					closeOnDocumentClick={false}
					trigger={(open) => <BurgerIcon open={open} />}
				>
					{(close) => <MobileNav close={close} />}
				</Popup>
			</Bars>
			<Nav>
				<Bars onClick={toggleHamburgerMenuHandler}></Bars>
				{/* {toggleHamburgerMenu && <SideDrawerNavigation />} */}

				<Goal />
				<ul className="navbarNav">
					<NavMenu>
						<NavItem navText="Dev Planner" href="/plan" icon={developmentSvg} />
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