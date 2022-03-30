import styled from "styled-components";

export const Button = styled.button`
	border-radius: 20px;
	border: 1px solid #ff4b2b;
	background-color: #ff4b2b;
	color: #ffffff;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		outline: none;
	}
	width: 170px;
`;

export const GhostButton = styled(Button)`
	background-color: transparent;
	border-color: #ffffff;
`;
