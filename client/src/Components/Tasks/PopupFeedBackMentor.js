import React from "react";
import { PopUpFormStyles } from "./PopUpForm.styles";

const PopupFeedBack = (props) => {
	return (
		<PopUpFormStyles>
			<div className="popup-box">
                <div className="box">
				<span className="close-icon" onClick={props.handleClose}>
					x
				</span>
				{props.content}
                </div>
			</div>
		</PopUpFormStyles>
	);
};

export default PopupFeedBack;


