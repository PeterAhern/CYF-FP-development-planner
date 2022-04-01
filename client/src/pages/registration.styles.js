import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	height: 100vh;

	.login_container {
		background: linear-gradient(
			to left,
			rgba(243, 240, 240, 0),
			rgba(223, 174, 182, 0.952)
		);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-family: "Roboto", sans-serif;
		color: rgb(82, 64, 64);
		height: 100vh;
		margin: -20px 0 50px;
	}
	.login_container h1,
	h2 {
		margin-bottom: 3rem;
	}
	.landingHeader {
		text-align: center;
	}
`;