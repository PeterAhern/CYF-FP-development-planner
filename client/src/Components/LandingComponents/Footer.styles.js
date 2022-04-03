import styled from "styled-components";

export const FooterDiv = styled.div`
	background: transparent;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: auto;
	height: 80%;

	@media (max-width: 1000px) {
		padding: 70px 30px;
	}

	img {
		height: 100%;
		width: 100%;
	}

	.elementalLogo {
		height: 100%;
		width: 20%;
		animation: fadeIn ease 5s;
		animation-delay: 2s;
		opacity: 0;
		-webkit-animation: fadeIn ease 5s;
		-webkit-animation-delay: 2s;
		-webkit-animation-fill-mode: forwards;
		-moz-animation: fadeIn 5s;
		-moz-animation-delay: 2s;
		-moz-animation-fill-mode: forwards;
		-o-animation: fadeIn 5s;
		-o-animation-delay: 2s;
		-o-animation-fill-mode: forwards;
		-ms-animation: fadeIn 5s;
		-ms-animation-delay: 2s;
		-ms-animation-fill-mode: forwards;
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-moz-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-o-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@-ms-keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.elementalLogo img {
		height: 100%;
		width: 100%;
	}
`;