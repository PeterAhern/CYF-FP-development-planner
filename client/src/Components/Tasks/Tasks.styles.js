import styled from "styled-components";

export const TasksStyles = styled.div`
	width: 100%;
	height: calc(100% - 66px - 24px);
	background-color: #f5f5f5;

	.taskCard {
		width: 85%;
		height: 120px;
		margin: 2rem;
		background-color: rgba(161, 159, 159, 0.925);
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		border-radius: 10px;

		@media (min-width: 500px) {
			height: 180px;
		}
	}

	.card_title {
		width: 47%;
		height: 100%;
		text-align: center;
		margin: 0.5rem;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		overflow-y: scroll;
		overflow-x: hidden;
		font-size: medium;

		@media (min-width: 500px) {
			width: 57%;
			font-size: 2rem;
		}
	}
	.leftTaskDetails {
		width: 15%;
		height: 100%;
		margin-top: 0px;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
	}

	.card_due_date {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		margin-top: 0;
	}

	.taskDueLabel {
		width: 100%;
		text-align: center;
		color: white;
		font-size: medium;
		height: 20px;
		@media (min-width: 500px) {
			font-size: 1.5rem;
		}
	}

	.expense-date {
		display: flex;
		flex-direction: column;
		width: 4rem;
		height: 4rem;

		border: 1px solid red;
		// background-color: #2a2a2a;
		background-color: white;
		color: red;
		border-radius: 12px;
		align-items: center;
		justify-content: center;
		margin: 0;

		@media (min-width: 500px) {
			width: 8rem;
			height: 8rem;
		}
	}
	.expense-date__month {
		font-size: Large;
		font-weight: bold;

		@media (min-width: 500px) {
			font-size: 2rem;
		}
	}
	.expense-date__year {
		font-size: medium;
		
		@media (min-width: 500px) {
			font-size: 1.5rem;
		}
	}
	.expense-date__day {
		font-size: medium;
		font-weight: bold;
		@media (min-width: 500px) {
			font-size: 1.5rem;
		}
	}

	.card_status {
		width: 100%;
		text-align: center;
		height: 10px;
		margin-top: 0;
		font-size: medium;
		color: white;
		@media (min-width: 500px) {
			font-size: 1rem;
			height: 20px;
		}
	}

	.rightTaskDetails {
		display: flex;
		flex-flow: row wrap;
		width: 25%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.deleteTaskButtonSection {
		width: 90%;
		height: 20px;

		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		@media (min-width: 500px) {
			width: 100%;
			height: 50px;
		}
	}

	.editTaskButtonSection {
		width: 90%;
		height: 20px;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		@media (min-width: 500px) {
			width: 100%;
			height: 50px;
		}
	}

	.evidenceSide {
		width: 10%;
		height: 100%;
	}

	.taskEvidence {
		width: 80%;
		height: 20px;
		display: flex;
		justify-content: flex-start;
		margin-left: 0;
		@media (min-width: 500px) {
			height: 40px;
			width: 100%;
		}
	}

	.taskEvidence a {
		text-decoration: none;
		font-size: medium;
		color: white;
		@media (min-width: 500px) {
			font-size: 1rem;
		}
	}

	.noTasks {
		font-size: 1.5rem;
		text-align: center;
		margin: 1rem;
		@media (min-width: 500px) {
			font-size: 2.5rem;
			margin: 2rem;
		}
	}
	.statusShower {
		width: 90%;
		height: 40px;
		font-size: 10px;
		border-radius: 20px;
		border: 1px solid #ff2626;
		background-color: #f5f5f5;
		color: black;

		font-weight: bold;

		letter-spacing: 1px;
		text-transform: uppercase;
		@media (min-width: 500px) {
			padding: 12px 40px;
			width: 100%;
			height: 50px;
			font-size: 12px;
		}
	}
`;

