import React from "react";

import { PopupStyles } from "./Popup.styles";
const Popup = (props) => {
	const clickHandler = () => {
		props.setTrigger(false);
		props.setClicked(false);
	};
	return props.trigger ? (
		<PopupStyles>
			<div className="popup">
				<div className="popup-inner">
					<button className="close-btn" onClick={clickHandler}>
						x
					</button>
					{props.children}
				</div>
			</div>
		</PopupStyles>
	) : (
		""
	);
};
export default Popup;
