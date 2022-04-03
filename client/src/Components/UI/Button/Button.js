import styled from "styled-components";

export const Button = styled.button`
	border-radius: 20px;
	border: 1px solid #ff4b2b;
	background-color: #ff0000c3;
	color: #ffffff;
	font-size: 10px;
	font-weight: bold;

	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		outline: none;
	}
	width: 100%;
	height: 30px;

	@media (min-width: 500px) {
		padding: 12px 45px;
		height: 50px;
		font-size: 12px;
		width: 170px;
	}
`;

export const GhostButton = styled(Button)`
	background-color: transparent;
	border-color: #ffffff;
`;
