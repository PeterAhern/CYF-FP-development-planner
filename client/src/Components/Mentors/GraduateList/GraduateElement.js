import {  useState } from "react";

const GraduateElement = (props) => {
    	const [clicked, setClicked] = useState(false);

	return (
		<div className="element">
			<button
				type="button"
				className="btn btn-danger"
				onClick={() => setClicked(!clicked)}
			>
				{props.name}
                {/* Technical */}
			</button>
            {clicked&&
            <div>
               TASKS
            </div>
                }
		</div>
	);
};
export default GraduateElement;
