import styled from "styled-components";

export const MentorsCommentStyles = styled.div`
	width: 40%;
	height: calc(100vh - 450px);
	overflow: scroll;

	.form {
		display: flex;
		flex-flow: row wrap;
		/* flex-direction: column; */
		background-color: green;
	}

	.commentsArea {
		display: flex;
		flex-flow: row wrap;
		border-style: solid;
		width: 100%;
		height: 100vh;
		border-width: 1px;
		border-color: rgb(46, 44, 44);
		background: white;
	}

	.blue {
		background-color: rgb(123, 216, 216);
	}

	.green {
		background-color: rgb(228, 180, 198);
	}

	ul {
		padding-left: 0;
		margin: 1rem;
		// overflow:scroll;
	}
`;