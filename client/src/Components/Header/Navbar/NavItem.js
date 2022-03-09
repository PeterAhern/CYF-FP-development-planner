import React, { useState } from "react";

import classes from "./NavItem.module.css";

const NavItem = (props) => {
	const [open, setOpen] = useState(false);

	const navItemClickHandler = () => setOpen(!open);

	return (
		<li className={classes.navItem}>
			<a href={props.href} className={classes.iconButton} onClick={navItemClickHandler}>
				<img className={classes.navIcon} src={props.icon} alt="dev" />
			</a>
			{/* showing the dropdown when the open state is true */}
			{open && props.children}
		</li>
	);
};

export default NavItem;
