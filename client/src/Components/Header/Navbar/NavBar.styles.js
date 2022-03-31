import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;

	.navigationMenu {
		background-color: rgba(201, 196, 196, 0.925);
		width: 100%;
	}

	.me-auto {
		display: flex;
		width: 150px;
		justify-content: flex-end;
		height: 100px;
		background-color: blue;
	}


	.link {
		display: inline;
	}

	.none {
		display: none;
	}

	.navbarToggle {
		background-color: pink;
	}

	@media (max-width: 800px) {
		.me-auto {
			display: none;
		}
	}
`;
















