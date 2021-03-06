import styled from "styled-components";

export const DropdownItemStyles = styled.div`

    height: 50px;
    display: flex;
    align-items: center;
    border-radius: var(--border-radius);
    transition: background var(--speed);
    padding: 0.5rem;
    text-decoration: none;


	.menuItem:hover {
		background-color: #525357;
	}

	.iconRight {
		margin-left: auto;
	}

	.navIcon {
		--button-size: calc(var(--nav-size) * 0.8);
		width: var(--button-size);
		height: var(--button-size);
		background-color: rgba(209, 46, 46, 0.685);
		border-radius: 50%;
		padding: 5px;
		margin: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: filter 300ms;
	}
`;



