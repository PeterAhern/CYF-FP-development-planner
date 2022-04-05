import styled from "styled-components";

export const GoalStyles = styled.div`
	display: flex;
	flex-flow: row;
	width: 100%;
	

	.goal {
		width: 90%;
		height: 50px;
		color: rgba(14, 13, 13, 0.685);
		display: flex;
		justify-content: center;
	}

	.button {
		width: 10%;
		height: 40px;
		/* background-color: blue; */
		color: red;
		background-color: white;

		border-style: none;
	}

	.button:hover {
		color: white;
		background-color: red;
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





