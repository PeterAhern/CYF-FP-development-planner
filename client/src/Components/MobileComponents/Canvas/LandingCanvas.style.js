import styled from "styled-components";

export const Wrapper = styled.div`
	display: none;
	color: #808080;

	@media screen and (max-width: 768px) {
		.video-container {
			height: 100%;
			width: 100%;	
		   position: fixed;
		   top: 0;
		}

		position: fixed;
		top: 0;
		right: 0;
		/* transform: translate(10%, 10%); */
		width: 100%;
		height: 100%;
		display: block;
		z-index: -1;
		background: rgba(200, 0, 0, 0.9);
	}
`;