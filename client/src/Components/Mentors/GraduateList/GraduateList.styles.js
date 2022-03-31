import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	.gradPlanPage {
		width: 100%;
		height: calc(100vh - 30px);
		display: flex;
	}

	.elementsSection {
		display: flex;
		width:40%;
		height: calc(100vh - 50px);

		flex-flow: row wrap;
		background-color: rgba(139, 137, 150, 0.968);

		border-style: none;
	}

	.tasksSection {
		min-width: 60%;
		height: 100vh;
		overflow: hidden;
	}

	.elementsText {
		width: 100%;
		height: 50px;
		color: white;
	}

	.elements {
		width: 100%;
		height: 100%;
	}

	.elementButton {
		width: 20rem;
		height: 130px;
		margin: 2rem;
		display: flex;
		justify-content: center;
		background-color: rgb(218, 179, 185);
		padding:1rem;
	}
`;
