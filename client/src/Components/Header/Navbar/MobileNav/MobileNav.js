import React from "react";

import "./MobileNav.css";

import developmentSvg from "../../../../Assets/svg/devPlanner.svg";
import developmentIcon from "../../../../Assets/svg/development.svg";
import logInOutSvg from "../../../../Assets/svg/login-out.svg";
// import Card from "../../../UI/Card/Card";
import DropdownItem from "../DropdownItem";

 const MobileNav = ({ close, logoutHandler }) => (
		<div className="menu">
			<ul>
				<li onClick={close}>
					{
						<DropdownItem href="/plan" leftIcon={developmentSvg}>
							Plan
						</DropdownItem>
					}
				</li>
				<li onClick={close}>
					{
						<DropdownItem href="/profile" leftIcon={developmentIcon}>
							My Profile
						</DropdownItem>
					}
				</li>
				<li onClick={close}>
					{
						<DropdownItem href="/" leftIcon={logInOutSvg}>
							<button onClick={logoutHandler}>Logout</button>
						</DropdownItem>
					}
				</li>
			</ul>
		</div>
 );


export default MobileNav;