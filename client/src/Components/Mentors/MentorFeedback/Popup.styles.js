import styled from "styled-components";

export const PopupStyles = styled.div`
	.popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
    }

	.popup-inner {
		position: relative;
		padding: 32px;
		width: 100%;
		max-width: 850px;
		background-color: white;
		height: 50%;
		border-radius: 5px;
		overflow: scroll;
	}
	.popup-inner .close-btn {
		position: absolute;
		top: 16px;
		right: 16px;
		background-color: white;
		border-style: none;
	}
	.element {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.container {
		display: flex;
		flex-direction: column;
	}
	
	button:hover {
		color: red;
	}
	.comment {
		border-radius: 60px;
		/* font-size: xx-small; */
	}
	.submit {
		width: 4rem;
		height: 4rem;
	}
	
`;
