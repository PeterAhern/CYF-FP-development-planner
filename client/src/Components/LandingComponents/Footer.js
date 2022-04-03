import React from "react";
import cyfLogo from "../../Assets/svg/cyfLogo.svg";
import elemental from "../../Assets/svg/elemental.svg";

import {
	FooterDiv,
	// Container,
} from "./Footer.styles";


const Footer = () => {
	return (
		<FooterDiv>
			<div className="elementalLogo">
				<img src={elemental} alt="Elemental logo" />
			</div>
		</FooterDiv>
	);
};
export default Footer;