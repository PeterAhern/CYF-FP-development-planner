import styled from "styled-components";

export const MentorsHomeStyle = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;

	.main {
		width: 100%;
		height: 95%;
		display: flex;
	}

	.chosenMenteesSection {
		display: flex;
		width: 25%;
		height: 95%;

		flex-flow: row wrap;
		background-color: rgba(139, 137, 150, 0.968);

		border-style: none;
		justify-content: center;
		align-items: center;
	}

	.menteesSection {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		flex-flow: row wrap;
		background-color: rgba(139, 137, 150, 0.968);

		border-style: none;
	}

	.elementsText {
		margin: 1rem;
		width: 60%;
		height: 100px;
		color: white;
	}

	.gradButton {
		width: 180px;
		height: 130px;
		margin: 1rem;
		display: flex;
		justify-content: center;
		background-color: rgb(218, 179, 185);
		align-items: center;
		color: white;
		font-weight: 700;
	}


	.AllMenteesSection {
		margin-top: 0;
		width: 80%;
		height: 100%;

		background-color: none;
	}



	.tasksSection {
		min-width: 60%;
		height: 100vh;
		overflow: hidden;
	}

	.elements {
		width: 100%;
		height: 100%;
	}
`;




