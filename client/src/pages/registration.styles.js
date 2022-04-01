import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	height: 100vh;

	.login_container {
		background: linear-gradient(
			to left,
			rgba(243, 240, 240, 0),
			rgba(223, 174, 182, 0.952)
		);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-family: "Roboto", sans-serif;
		color: rgb(82, 64, 64);
		height: 100vh;
		margin: -20px 0 50px;
	}
	.login_container h1,
	h2 {
		margin-bottom: 3rem;
	}
	// .landingHeader {
	// 	text-align: center;
	// 	animation: fadeIn 3s;
	// 	animation-delay: 5s;
	// 	-webkit-animation: fadeIn 3s;
	// 	-webkit-animation-delay: 5s;
	// 	-moz-animation: fadeIn 3s;
	// 	-o-animation: fadeIn 3s;
	// 	-ms-animation: fadeIn 3s;
	// }

	.loginComp {
		opacity:0;
		animation: fadeIn 8s;
		animation-delay: 5s;
		-webkit-animation: fadeIn 8s;
		-webkit-animation-delay: 5s;
		-moz-animation: fadeIn 8s 3s;
		-o-animation: fadeIn 8s 3s;
		-ms-animation: fadeIn 8s 3s;
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