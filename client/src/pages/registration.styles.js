import styled from "styled-components";

export const RegistrationStyles = styled.div`
	width: 100%;
	height: 100vh;
	font-family: Raleway, sans-serif;
	margin: 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

	.upperPartLandingPage {
		width: 80%;
		height: 90%;
	}

	.footerPartLandingPage {
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: center;
	}

	.login_container {
		background: linear-gradient(to left, #ffffff, #f5f5f5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: black;
		height: 100vh;
		margin: -20px 0 50px;
	}

	.landingHeader {
		margin-bottom: 1.5rem;
		text-align: center;
		color: black;
		// font-family: Raleway, sans-serif;
		// animation: fadeIn 3s;
		// -webkit-animation: fadeIn 3s;
		// -moz-animation: fadeIn 3s;
		// -o-animation: fadeIn 3s;
		// -ms-animation: fadeIn 3s;

		@media (min-width: 500px) {
			margin-bottom: 3rem;
		}
	}

	.landingHeader h1 {
		width: auto;
		display: inline-block;
		overflow: hidden; /* Ensures the content is not revealed until the animation */
		border-right: 0.15em solid #ff2626; /* The typwriter cursor */
		white-space: nowrap; /* Keeps the content on a single line */
		margin: 0 auto; /* Gives that scrolling effect as the typing happens */
		letter-spacing: 0.05em; /* Adjust as needed */
		border-color: transparent;
		animation: typing 2.5s steps(30, end), blink-caret 0.75s step-end 3;
		animation-fill-mode: forwards;
	}

	.landingHeader h2 {
		font-size: 1rem;
		max-width: 90%;

		opacity: 0;
		overflow: hidden;
		border-right: 0.15em solid #ff2626;
		white-space: nowrap;
		margin: 0 auto;
		letter-spacing: 0.05em;
		border-color: transparent;
		animation: typing 2s steps(20, end), blink-caret 0.75s step-end 5;
		animation-delay: 2.05s;
		animation-fill-mode: forwards;

		@media (min-width: 500px) {
			font-size: 2rem;
		}
	}

	.landingLoginAndSignupSection {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	/* The typing effect */
	@keyframes typing {
		from {
			max-width: 0;
			opacity: 1;
		}
		to {
			max-width: 100%;
			opacity: 1;
		}
	}

	/* The typewriter cursor effect */
	@keyframes blink-caret {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: #ff2626;
		}
	}

	.loginComp {
		max-height: 100%;
		animation: fadeIn ease 5s;
		animation-delay: 2.2s;
		opacity: 0;
		-webkit-animation: fadeIn ease 5s;
		-webkit-animation-delay: 2.2s;
		-webkit-animation-fill-mode: forwards;
		-moz-animation: fadeIn ease 3s;
		-moz-animation-delay: 4s;
		-moz-animation-fill-mode: forwards;
		-o-animation: fadeIn ease 3s;
		-o-animation-delay: 4s;
		-o-animation-fill-mode: forwards;
		-ms-animation: fadeIn ease 3 s;
		-ms-animation-delay: 4s;
		-ms-animation-fill-mode: forwards;

		@media (min-width: 500px) {
			
		}
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
`;