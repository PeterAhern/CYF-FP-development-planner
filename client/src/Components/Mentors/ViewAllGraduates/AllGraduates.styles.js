import styled from "styled-components";

export const AllGraduatesStyles = styled.div`

	.searchAll {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.searchBar {
		width: 100%;
	}

	.allGrads {
		width: 70%;
	}

	width: 100%;
	height: calc(100vh - 400px);

	overflow: scroll;

	.searchBar {
		width: 90%;
		margin: 1rem;
	}

	.allGrads {
		height: 30px;

		margin: 0.5rem;
	}

	.list {
		/* height: 100vh; */
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		margin: 1rem 1rem 0 0;
		background-color: white;
		color: black;

	}

	li {
		width: 100%;
		height: 40px;
		padding: 0 1rem 0 0;
		background-color: white;
		color: black;
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
