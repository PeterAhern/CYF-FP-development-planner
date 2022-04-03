import styled from "styled-components";

export const MyPlanStyles = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;

	.gradPlanPage {
		width: 100%;
		height: 95%;
		display: flex;
	}

	.elementsSection {
		display: flex;
		width: 30%;
		height: 95%;
		flex-flow: row wrap;
		background-color: #ff2626;
		border-style: none;
		justify-content: center;
		align-items: center;
	}

	.fixedElementsButtonsSelected {
		width: 100%;
		display: flex;
		height: 95%;
		flex-flow: row wrap;
		// background-color: rgba(139, 137, 150, 0.968);
		background-color: #ff2626;
		border-style: none;
		justify-content: center;
		align-items: center;
	}

	.fixedElementsButtonsUnSelected {
		display: none;
	}

	.tasksSection {
		display: flex;
		flex-flow: row wrap;
		margin-top: 0;
		width: 80%;
		height: 100%;
		background-color: none;
	}

	.fixedTasksSectionUnSelected {
		display: none;
	}

	.fixedTasksSectionSelected {
		display: flex;
		width: 100%;
		height: 95%;
		flex-flow: row wrap;
		// background-color: rgba(139, 137, 150, 0.968);

		border-style: none;
		justify-content: center;
		align-items: center;

		@media (min-width: 500px) {
			background-color: #ff2626;
		}
	}

	.elementsText {
		width: 90%;
		color: white;
		height: 3rem;

		font-size: 1rem;

		@media (min-width: 500px) {
			background-color: #ff2626;
			height: 5rem;
			font-size: 1.5rem;
		}
	}

	.elementsButtonsSection {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	.elementButton {
		width: 95%;
		height: 5rem;
		border-radius: 1.5rem;
		margin-left: auto;
		margin-right: auto;
		margin-top: 0.3rem;
		margin-bottom: 0.3rem;
		padding-left: 4rem;
		padding-right: 4rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #f5f5f5;
		align-items: center;

		@media (min-width: 500px) {
			height: 9rem;
			margin-top: 0.5rem;
			margin-bottom: 0.5rem;
			padding-left: 7rem;
			padding-right: 7rem;
		}
	}

	.elementButton div {
		font-size: 1rem;

		@media (min-width: 500px) {
			font-size: 2rem;
		}
	}

	.overallButtons {
		background-color: #ff2626;
		width: 100%;
		height: 10px;
		display: fixed;
		justify-content: flex-end;
	}

	.addNewTaskButton {
		position: fixed;
		width: 120px;
		height: 50px;
		font-size: 10px;
		font-weight: 800;
		box-shadow: 10px 10px 5px #aaaaaa;
		background-color: #ff2626;
		justify-content: center;
		justify-self: center;
		margin: 0.5rem 9.5rem 0 0;

		@media (min-width: 500px) {
			margin: 3rem 2rem 0 0;
			width: 150px;
		}
	}

	.addNewTaskButton:hover {
		color: #ff0000c3;
		background-color: rgb(218, 179, 185);
		cursor: pointer;
	}

	.PopUp {
		width: 100%;
		height: 80%;
	}

	.viewFeedbackButton {
		position: fixed;
		width: 120px;
		height: 50px;
		font-size: 10px;
		color: #ff2626;
		font-weight: 800;
		justify-content: center;
		background-color: rgb(218, 179, 185);
		box-shadow: 10px 10px 5px #aaaaaa;
		margin-top: 0.4rem;
		margin-right: 1.5rem;

		@media (min-width: 500px) {
			width: 150px;
			margin-top: 3rem;
			margin-right: 12rem;
		}
	}

	.viewFeedbackButton:hover {
		background-color: #ff0000c3;
		color: white;
		cursor: pointer;
	}

	.elementTasksList {
		padding-top: 6rem;
		width: 100%;
		height: calc(100vh - 290px);
		overflow: scroll;
	}

	.elementTasksHeading {
		width: 100%;
		height: 80px;
		// background-color: #ff0000c3;
		/* background-color: #ff2626; */
		color: #ff2626;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;

		@media (min-width: 500px) {
			font-size: 3rem;
		}
	}

	.returnToElementsButton {
		width: 50px;
		height: 50px;
		font-size: 0.5rem;
		background-color: #ff2626;
		border-radius: 50%;
		border-style: none;
		color: white;
	}

	.returnToElementsButton:hover {
		background-color: white;
		color: #ff2626;
	}

	.remove {
		height: 2rem;
	}
`;



