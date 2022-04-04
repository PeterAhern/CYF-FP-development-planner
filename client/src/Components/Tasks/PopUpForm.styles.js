
import styled from "styled-components";

// /* Popup style */
export const PopUpFormStyles = styled.div`
	overflow-x: hidden;

	.form {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
	}

	.popup-box {
		position: fixed;
		background: transparent;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
	}

	ul {
		width: 30%;
		margin: 0;
		left: 0;
	}

	.timeline {
		position: fixed;
		left: 0;
		width: 100%;
	}

	.gradComments,
	.mentorComments {
		background-color: #c9e265;
		border-radius: 5px;
		padding: 10px 20px;
		position: relative;
		width: 80%;
		box-sizing: border-box;
		margin-right: auto;
		margin-left: auto;
	}

	.mentorComments {
		left: 2rem;
		background-color: #38b6ff;
	}

	.box {
		position: relative;
		width: 100%;
		margin: 0 auto;
		height: 100%;
		margin-top: calc(100vh - 85vh - 20px);
		background: #f5f5f5;
		border-radius: 8px;
		padding: 20px;
		border: 1px solid #999;
		box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
		overflow-wrap: break-word;
		overflow: scroll;

		@media (min-width: 500px) {
			width: 30%;
			height: 35rem;
		}
	}

	.close-icon {
		content: "x";
		cursor: pointer;
		position: fixed;
		color: red;
		right: calc(34%);
		top: calc(100vh - 85vh - 33px);
		background: #ededed;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		line-height: 20px;
		text-align: center;
		border: 1px solid black;
		font-size: 2.5rem;
	}
	.blue {
		background-color: rgb(123, 216, 216);
	}

	* {
		box-sizing: border-box;
	}

	/* Set a background color */
	body {
		background-color: #474e5d;
		font-family: Helvetica, sans-serif;
	}

	/* The actual timeline (the vertical ruler) */
	.timeline {
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* The actual timeline (the vertical ruler) */
	.timeline::after {
		content: "";
		// position: absolute;
		width: 6px;
		background-color: white;
		top: 0;
		bottom: 0;
		left: 50%;
		margin-left: -3px;
	}

	/* Container around content */
	.container {
		padding: 10px 40px;
		position: relative;
		background-color: inherit;
		width: 80%;
		overflow-wrap: word-break;
	}

	/* The circles on the timeline */
	.container::after {
		content: "";
		position: absolute;
		width: 25px;
		height: 25px;
		right: -17px;
		background-color: white;
		border: 4px solid #ff9f55;
		top: 15px;
		border-radius: 50%;
		z-index: 1;
	}

	/* Place the container to the left */
	.left {
		left: 0;
		background-color: rgb(228, 180, 198);
		border-radius: 5px;
	}

	/* Place the container to the right */
	.right {
		left: 50%;
		background-color: rgb(123, 216, 216);
		border-radius: 5px;
	}

	/* Add arrows to the left container (pointing right) */
	.left::before {
		content: " ";
		height: 0;
		position: absolute;
		top: 22px;
		width: 0;
		z-index: 1;
		right: 30px;
		border: medium solid white;
		border-width: 10px 0 10px 10px;
		border-color: transparent transparent transparent white;
	}

	/* Add arrows to the right container (pointing left) */
	.right::before {
		content: " ";
		height: 0;
		position: absolute;
		top: 22px;
		width: 0;
		z-index: 1;
		left: 30px;
		border: medium solid white;
		border-width: 10px 10px 10px 0;
		border-color: transparent white transparent transparent;
	}

	/* Fix the circle for containers on the right side */
	.right::after {
		left: -16px;
	}

	/* The actual content */
	.content {
		padding: 20px 30px;
		background-color: white;
		position: relative;
		border-radius: 6px;
	}
	.content h5 {
		color: #2d5699;
	}
	.content h4 {
		color: #250414;
	}

	/* Media queries - Responsive timeline on screens less than 600px wide */
	@media screen and (max-width: 600px) {
		/* Place the timelime to the left */
		.timeline::after {
			left: 31px;
		}

		/* Full-width containers */
		.container {
			width: 100%;
			padding-left: 70px;
			padding-right: 25px;
		}

		/* Make sure that all arrows are pointing leftwards */
		.container::before {
			left: 60px;
			border: medium solid white;
			border-width: 10px 10px 10px 0;
			border-color: transparent white transparent transparent;
		}

		/* Make sure all circles are at the same spot */
		.left::after,
		.right::after {
			left: 15px;
		}

		/* Make all right containers behave like the left ones */
		.right {
			left: 0%;
		}
	}
`;


