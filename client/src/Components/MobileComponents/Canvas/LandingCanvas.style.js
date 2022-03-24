import styled from "styled-components";

export const Wrapper = styled.div`
	display: none;
	color: #808080;
	@media screen and (max-width: 768px) {
		position: fixed;
		top: 0;
		right: 0;
		/* transform: translate(-20%, 100%); */
		width: 100%;
		display: block;
		z-index: -1;
	}
`;