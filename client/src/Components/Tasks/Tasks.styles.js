import styled from "styled-components";

export const TasksStyles = styled.div`
	width: 100%;
	height: calc(100% - 66px - 24px);
	/* background-color: black; */
	overflow: scroll;

	.taskCard {
		max-width: 95%;
		height: 180px;
		margin: 2rem;
		background-color: rgba(161, 159, 159, 0.925);
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}

	.card_title {
		width: 30%;
		height: 100%;
		text-align: center;
		/* background-color: violet;    */
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
	}
	.leftTaskDetails {
		/* background-color: aqua; */
		width: 30%;
		height: 100%;
		margin-top: 0px;
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
		font-size: 1rem;
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
		font-size: 0.75rem;
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
		width: 35%;
		height: 100%;
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

	.bottomTaskDetails {
		width: 100%;
		height: 40px;
		display: flex;
		flex-direction: row wrap;
		align-items: center;
		justify-content: center;
		/* background-color: yellow; */
	}

	.bottomTaskDetails a {
		text-decoration: none;
		font-size: 1rem;
		color: white;
	}

	/* width */
	::-webkit-scrollbar {
		width: 20px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px rgba(128, 128, 128, 0.74);
		border-radius: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: rgba(233, 203, 203, 0.616);
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: rgba(233, 203, 203, 0.616);
	}
`;

