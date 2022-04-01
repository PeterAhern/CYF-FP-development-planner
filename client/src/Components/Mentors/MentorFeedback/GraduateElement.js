import { GraduateElementStyles } from "./GraduateElement.styles";


const GraduateElement = (props) => {
	return (
		<GraduateElementStyles>
			<button
				value={props.graduateEmail}
				name={props.id}
				type="button"
				className="graduateElementButton"
				onClick={() => props.setClicked(props.id)}
			>
				{props.name}
			</button>
		</GraduateElementStyles>
	);
};
export default GraduateElement;
