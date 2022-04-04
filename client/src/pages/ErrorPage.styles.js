import styled from "styled-components";

export const ErrorPageStyles = styled.div`
	width: 100%;
	height: 90%;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;

	.errorPageSection {
		height: 70%;
		width: 100%;
		display: flex;
		flex-flow: row wrap;

		h1 {
			width: 100%;
			font-size: 3rem;
			background: red;
			color: white;
			text-align: center;
			height: 120px;

			@media (min-width: 500px) {
				height: 50px;
			}
		}
		h1:hover {
			background: white;
			color: red;
		}

		h2 {
			width: 100%;
			font-size: 3rem;
			background: white;
			color: red;
			text-align: center;
			height: 50px;
		}

		a {
			text-decoration: none;
			background-color: red;
			color: white;
		}

		a:hover {
			background: white;
			color: red;
		}
	}

	footerSection {
		height: 10%;
		width: 100%;
	}
`;