import styled from "styled-components";

export const FooterDiv = styled.div`
	background: transparent;

	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: auto;
	max-height: 100%;

	@media (max-width: 1000px) {
		padding: 70px 30px;
	}

	img {
		height: 100%;
		width: 100%;
	}

	.cyfLogo {
		height: 100%;
		width: 20%;
	}

	.elementalLogo {
		height: 100%;
		width: 20%;
	}

	.elementalLogo img {
		/* height: 12rem; */
		height: 100%;
		width: 100%;
	}

	.cyfLogo a {
		/* position: absolute;
		bottom: 5rem; */
	}
`;