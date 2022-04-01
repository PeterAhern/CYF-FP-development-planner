import styled from "styled-components";

export const TasksStyles = styled.div`
	width: 100%;
	height: calc(100% - 66px - 24px);
	/* background-color: black; */
	/* overflow-y: scroll; */

	.taskCard {
		max-width: 90%;
		height: 180px;
		margin: 2rem;
		background-color: rgba(161, 159, 159, 0.925);
		display: flex;
		flex-flow: row;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}

	.card_title {
		width: 57%;
		height: 100%;
		text-align: center;
		margin: 1rem;
		/* background-color: violet;    */
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		overflow-y: scroll;
		overflow-x: hidden;
		/* text-wrap: wrap; */
	}
	.leftTaskDetails {
		/* background-color: aqua; */
		width: 10%;
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
		font-size: 1.5rem;
		height: 20px;
	}

	.expense-date {
		display: flex;
		flex-direction: column;
		width: 6.5rem;
		height: 6.5rem;
		border: 1px solid #ececec;
		background-color: #2a2a2a;
		color: white;
		border-radius: 12px;
		align-items: center;
		justify-content: center;
		margin: 0;
	}
	.expense-date__month {
		font-size: 1.75rem;
		font-weight: bold;
	}
	.expense-date__year {
		font-size: 0.75rem;
	}
	.expense-date__day {
		font-size: 0.75rem;
		font-weight: bold;
	}

	.card_status {
		width: 100%;
		text-align: center;
		height: 20px;
		margin-top: 0;
		font-size: 1rem;
		color: white;
	}

	.rightTaskDetails {
		display: flex;
		flex-flow: row wrap;
		width: 20%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.deleteTaskButtonSection {
		width: 100%;
		height: 50px;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	.editTaskButtonSection {
		width: 100%;
		height: 50px;
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	.evidenceSide {
		width: 10%;
		height: 100%;
	}

	.taskEvidence {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: flex-start;
		margin-left: 0;
	}

	.taskEvidence a {
		text-decoration: none;
		font-size: 1rem;
		color: white;
	}
`;

