import styled from "styled-components";

export const TaskFormStyles = styled.div`
	.form-container {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		transform: translate(-50%, -50%);
		background: transparent;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.form-container h2 {
		// margin: 0 0 30px;
		padding: 1rem;
		color: black;
		text-align: center;
		text-decoration: underline dotted #ff2626;
	}

	.form-container .taskInput {
		position: relative;
	}

	.form-container .taskInput input {
		width: 50%;
		padding: 0;
		font-size: 1.5rem;
		justify-content: center;
		color: black;
		margin-left: 9rem;
		margin-bottom: 2rem;
		border: none;
		border-bottom: 1px solid red;
		outline: none;
		background: white;
	}
	.form-container .taskInput label {
		position: absolute;
		top: 0;
		left: 1rem;
		padding: 10px 0;
		font-size: 1.5rem;
		color: black;
	}

	.form-container .taskInput select {
		width: 55%;
		margin-left: 9rem;
		margin-bottom: 2rem;
		// padding: 10px 0;
		font-size: 1.5rem;
		color: black;
	}

	.form-container .taskInput input:focus ~ label,
	.form-container .taskInput input:valid ~ label {
		top: -20px;
		left: 0;
		color: black;
		font-size: 12px;
	}

	.form-container form .taskButton {
		position: relative;
		left: 31%;
		padding: 10px 20px;
		color: #ff2626;
		font-size: 2rem;
		text-decoration: none;
		text-transform: uppercase;
		overflow: hidden;
		margin-top: 40px;
		letter-spacing: 4px;

		transition: all 0.5s ease;
		color: #ff2626;
		border: 3px solid #ff2626;
		text-transform: uppercase;
		text-align: center;
		line-height: 1;
		background-color: transparent;
		padding: 10px;
		outline: none;
		border-radius: 4px;
	}

	.form-container form .taskButton:hover {
		color: white;
		background-color: #ff2626;
	}

	.form-container .taskButton a span {
		position: absolute;
		display: block;
	}
`;