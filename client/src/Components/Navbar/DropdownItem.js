import classes from "./DropdownItem.module.css";

const DropdownItem = (props) => {

	return (
		<a href="/" className={classes.menuItem}>
			<span className={classes.iconButton}>
				{props.leftIcon && (
					<img className={classes.navIcon} src={props.leftIcon} alt="dev" />
				)}
			</span>
			{props.children}
			<span className={classes.iconRight}>
				{props.rightIcon && (
					<img className={classes.navIcon} src={props.rightIcon} alt="dev" />
				)}
			</span>
		</a>
	);
};

export default DropdownItem;
