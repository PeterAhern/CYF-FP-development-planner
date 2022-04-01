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

	.rightSideDisplaySection {
		width: 80%;
		height: 100%;
	}

	.AllMenteesSection {
		margin-top: 0;
		width: 100%;
		height: 150px;
		overflow-y: scroll;

		background-color: none;
	}

	.graduateButtons {
		background-color: rgba(139, 137, 150, 0);
		width: 100%;
		height: 10px;
		display: fixed;
		justify-content: flex-end;
	}

	.menteeCommentButton {
		position: fixed;
		margin: 5rem 2rem 0 0;
		background-color: none;
		width: 150px;
		height: 50px;
		font-size: 10px;
		font-weight: 800;
		box-shadow: 10px 10px 5px #aaaaaa;
	}

	.menteeCommentButton:hover {
		color: #ff0000c3;
		background-color: rgb(218, 179, 185);
		cursor: pointer;
	}

	.addNewTaskButton {
		position: fixed;
		margin-top: 0.5rem;
		margin-right: 2rem;
		width: 150px;
		height: 50px;
		font-size: 10px;
		color: #ff0000c3;
		font-weight: 800;
		justify-content: center;
		background-color: rgb(218, 179, 185);
		box-shadow: 10px 10px 5px #aaaaaa;
	}

	.addNewTaskButton:hover {
		background-color: #ff0000c3;
		color: white;
		cursor: pointer;
	}

	.graduateElementsDisplaySection {
		width: 100%;
		height: 100px;
		display: flex;
		/* background-color: blue; */
		flex-flow: row wrap;
	}

	.graduateElementsSection {
		height: 100%;
		width: 100%;
		/* background-color: orange; */
		display: flex;
		/* justify-content: space-evenly; */
		align-items: center;
		justify-content: flex-start;
	}

	.gradElement {
		display: flex;
		height: 100%;
		width: 50px;
		/* justify-content: space-evenly; */
		/* align-items: center; */
	}

	.removeGraduateButton {
		height: 100%;
		width: 100px;
		background-color: white;
		color: red;
		border: none;
		justify-self: flex-end;
	}

	.removeGraduateButton:hover {
		background-color: red;
		color: white;
		border: none;
	}

	.tasksSection {
		min-width: 60%;
		height: 100vh;
		overflow: hidden;
		background-color: blue;
	}

	.graduateElementTasksDisplaySection {
		padding-top: 6rem;
		overflow: scroll;
		height: calc(100vh - 470px);
	}
`;




