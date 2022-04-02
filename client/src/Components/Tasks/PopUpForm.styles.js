
import styled from 'styled-components';

// /* Popup style */
export const PopUpFormStyles = styled.div`
	.popup-box {
		position: fixed;
		background: transparent;
		width: 100%;
		height: 100vh;
		top: 0;
		left: 0;
	}

	.box {
		position: relative;
		width: 30%;
		min-width: 30rem;
		margin: 0 auto;
		height: 35rem;
		margin-top: calc(100vh - 85vh - 20px);
		background: #f5f5f5;
		border-radius: 8px;
		padding: 20px;
		border: 1px solid #999;
		overflow: auto;
		box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
	}

	.close-icon {
		content: "x";
		cursor: pointer;
		position: fixed;
		color:red;
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
`;


