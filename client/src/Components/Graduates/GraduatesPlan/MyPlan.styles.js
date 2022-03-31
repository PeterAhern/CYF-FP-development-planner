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
		width: 25%;
		height: 95%;

		flex-flow: row wrap;
		background-color: rgba(139, 137, 150, 0.968);

		border-style: none;
		justify-content: center;
		align-items: center;
	}

	.tasksSection {
		margin-top: 0;
		width: 80%;
		height: 100%;

		background-color: none;
	}

	.overallButtons {
		background-color: rgba(139, 137, 150, 0);
		width: 100%;
		height: 10px;
		display: fixed;
		justify-content: flex-end;
	}

	.addNewTaskButton {
		position: fixed;
		margin: 5rem 2rem 0 0;
		background-color: none;
		width: 150px;
		height: 50px;
		font-size: 10px;
		font-weight: 800;
		box-shadow: 10px 10px 5px #aaaaaa;
	}

	.addNewTaskButton:hover {
		color: #ff0000c3;
		background-color: rgb(218, 179, 185);
		cursor: pointer;
	}

	.viewFeedbackButton {
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

	.viewFeedbackButton:hover {
		background-color: #ff0000c3;
		color: white;
		cursor: pointer;
	}

	.elementTasksList {
		padding-top: 6rem;
		width: 100%;
		height: 100%;
		overflow: scroll;
	}

	.elementTasksHeading {
		width: 100%;
		height: 80px;
		background-color: #ff0000c3;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3rem;
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
		width: 180px;
		height: 130px;
		margin: 2rem;
		display: flex;
		justify-content: center;
		background-color: rgb(218, 179, 185);
		align-items: center;
	}
`;



