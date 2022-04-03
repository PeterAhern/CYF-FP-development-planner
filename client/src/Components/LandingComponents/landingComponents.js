import styled from "styled-components";

export const Container = styled.div`
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	position: relative;
	overflow: hidden;
	width: 678px;
	max-width: 100%;
	min-height: 400px;
`;

export const SignUpContainer = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
	${(props) =>
		props.signingIn !== true
			? `
  transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	`
			: null}
`;

export const SignInContainer = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
	left: 0;
	width: 50%;
	z-index: 2;
	${(props) =>
		props.signingIn !== true ? "transform: translateX(100%);" : null}
`;

export const Form = styled.form`
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
`;

export const Title = styled.h2`
	font-weight: bold;
	margin: 0;
`;

export const Input = styled.input`
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
	height: 40px;
	font-size: 20px;
`;

export const Button = styled.button`
	border-radius: 20px;
	border: 1px solid black;
	background-color: #ff2626;
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
	&:hover {
		color: black;
	}
`;

export const Button2 = styled.button`
	border-radius: 20px;
	border: 1px solid #ff4b2b;
	background-color: #ffffff;
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
	&:hover {
		color: red;
	}
`;

export const Button3 = styled.button`
	border-radius: 20px;
	border: 1px solid black;
	background-color: #ff2626;
	color: #ffffff;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	margin-top: 20px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		outline: none;
	}
	&:hover {
		color: black;
	}
`;

export const Button4 = styled.button`
	margin-top: 50px;
`;
export const Button5 = styled.button`
	border-radius: 20px;
	border: 1px solid black;
	background-color: #ff2626;
	color: #ffffff;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	margin-top: 20px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
	&:active {
		transform: scale(0.95);
	}
	&:focus {
		outline: none;
	}
	&:hover {
		color: black;
	}
`;

export const GhostButton = styled(Button)`
	background-color: black;
	border-color: black;
`;

export const GhostButton2 = styled(Button2)`
	background-color: #ffffff;
	border-color: black;
	color: black;
	padding-right: 10px;
	padding-left: 10px;
	margin-top: 20px;
`;

export const GhostButton3 = styled(Button2)`
	background-color: #ffffff;
	border-color: black;
	color: black;
`;

export const Anchor = styled.a`
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
`;

export const OverlayContainer = styled.div`
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
	${(props) =>
		props.signingIn !== true ? "transform: translateX(-100%);" : null}
`;

export const Overlay = styled.div`
	background: #ff416c;
	// background: -webkit-linear-gradient(to right, #ff6969, #ff2626);
	// background: linear-gradient(to right, #ff6969, #ff2626);
	background-color: #ff2626;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: #ffffff;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
	${(props) =>
		props.signingIn !== true ? "transform: translateX(50%);" : null}
`;

export const OverlayPanel = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
	transform: translateX(-20%);
	${(props) => (props.signingIn !== true ? "transform: translateX(0);" : null)}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
	right: 0;
	transform: translateX(0);
	${(props) =>
		props.signingIn !== true ? "transform: translateX(20%);" : null}
`;
export const Paragraph = styled.p`
	font-size: 18px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 35px;
`;

export const Paragraph2 = styled.p`
	font-size: 18px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 10px;
`;

export const Paragraph3 = styled.p`
	font-size: 18px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 60px;
`;
