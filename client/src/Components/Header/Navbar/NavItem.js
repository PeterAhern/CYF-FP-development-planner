import React, { useState } from "react";

import classes from "./NavItem.module.css";

const NavItem = (props) => {
	const [open, setOpen] = useState(false);

	const [hover, setHover] = useState(false);

	const onHover = () => {
		setHover(true);
	};

	const onLeave = () => {
		setHover(false);
	};

	const navItemClickHandler = () => setOpen(!open);

	return (
		<li
			className={classes.navItem}
			onMouseEnter={onHover}
			onMouseLeave={onLeave}
			role="button"
			tabIndex="-3"
		>
			<a
				href={props.href}
				className={classes.iconButton}
				onClick={navItemClickHandler}
			>
				<img className={classes.navIcon} src={props.icon} alt="dev" />
			</a>
			{props.navText && (
				<span className={classes.navText}>{hover ? props.navText : ""}</span>
			)}
			{/* showing the dropdown when the open state is true */}
			{open && props.children}
		</li>
	);
};

export default NavItem;
