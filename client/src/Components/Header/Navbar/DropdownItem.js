import { DropdownItemStyles } from "./DropdownItem.styles";

const DropdownItem = (props) => {

	return (
		<DropdownItemStyles href={props.href}>
			<span className="iconButton">
				{props.leftIcon && (
					<img className="navIcon" src={props.leftIcon} alt="dev" />
				)}
			</span>
			{props.children}
			<span className="iconRight">
				{props.rightIcon && (
					<img className="navIcon" src={props.rightIcon} alt="dev" />
				)}
			</span>
		</DropdownItemStyles>
	);
};

export default DropdownItem;
