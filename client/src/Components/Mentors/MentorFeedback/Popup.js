import React from "react";

import "./Popup.css";
const Popup = (props) => {
	const clickHandler = () => {
		props.setTrigger(false);
		props.setClicked(false);
	};
	return props.trigger ? (
		<div className="popup">
			<div className="popup-inner">
				<button className="close-btn" onClick={clickHandler}>
					x
				</button>
				{props.children}
			</div>
		</div>
	) : (
		""
	);
};
export default Popup;
