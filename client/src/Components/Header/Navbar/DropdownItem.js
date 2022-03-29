import classes from "./DropdownItem.module.css";

const DropdownItem = (props) => {

	return (
		<div href={props.href} className={classes.menuItem}>
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
		</div>
	);
};

export default DropdownItem;
