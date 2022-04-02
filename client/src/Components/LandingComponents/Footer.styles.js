import styled from "styled-components";

export const FooterDiv = styled.div`
	background: transparent;
	position: fixed;
	bottom: 0;
	display: flex;
	width: 100%;
	margin-top: auto;

	@media (max-width: 1000px) {
		padding: 70px 30px;
	}

	img {
		height: 3rem;
		width: auto;
		position: flex;
	}

	.cyfLogo {
		position: relative;
		bottom: 0;
		left: 55%;
		align-content: bottom;
	}

	.elementalLogo {
		left: 32%;
	}

	.elementalLogo,
	.cyfLogo {
		height: 12rem;
		position: relative;
		bottom: 0;
	}

	.elementalLogo img {
		height: 12rem;
	}

	.cyfLogo a{
		position: absolute;
		bottom: 5rem;
	}
`;