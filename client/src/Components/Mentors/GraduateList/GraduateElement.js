import { useState } from "react";
import GraduateTasks from "./GraduateTasks";

const GraduateElement = (props) => {
	const [clicked, setClicked] = useState(false);
	return (
		<div >
			<button
				value={props.graduateEmail}
				name={props.id}
				type="button"
				className="btn btn-danger"
				onClick={() => setClicked(!clicked)}
			>
				{props.name}
			</button>
			{clicked && (
				<GraduateTasks
					userEmail={props.graduateEmail}
					elementId={props.id}
					className="element"
				/>
			)}
		</div>
	);
};
export default GraduateElement;
