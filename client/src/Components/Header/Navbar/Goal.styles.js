import styled from "styled-components";

export const GoalStyles = styled.div`
	display: flex;
	flex-flow: row;
	width: 800px;

	.goal {
		max-width: 600px;
		height: 50px;
		margin-right: 35%;
		margin-top: 1%;
		color: rgba(14, 13, 13, 0.685);
		overflow: hidden;
	}

	.button {
		width: 200px;
		height: 40px;
		/* background-color: blue; */

		border-style: none;
		color: azure;
	}

	.goalInput {
		width: 300px;
		height: 40px;
		/* background-color: green; */
	}

	@media (max-width: 800px) {
		.button {
			width: 60px;
			height: 40px;
			background-color: red;
		}

		.goalInput {
			width: 200px;
			height: 60px;
		}
	}
`;





