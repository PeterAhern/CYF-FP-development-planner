import styled from "styled-components";

export const AllGraduatesStyles = styled.div`
	width: 90%;
	height: 100%;
	overflow: scroll;
	.searchBar {
		width: 20%%;
	}

	.allGrads {
		height: 30px;
	}

	.list {
		/* height: 100vh; */
		width: 100%;
		display: flex;
		flex-flow: row wrap;
	}

	li {
		width: 100%;
		height: 40px;
		padding: 0 1rem 0 0;
	}

	@media (min-width: 500px) {
		width: 100%;
		height: calc(100vh - 400px);

		.list {
			margin: 1rem 1rem 0 0;
		}

		li {
			height: 50px;
			padding: 0 1rem 0 0;
		}
	}
`;
