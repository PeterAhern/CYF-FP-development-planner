import styled from "styled-components";

export const MentorGraduatesStyles = styled.h4`
	width: 100%;
	height: 100%;
	font-size: 1rem;
	text-align: left;
	color: #ff2626;
	font-weight: 800;
	padding-left:1rem;
	padding-top:1rem;

	:hover {
		background: #ff2626;
		font-weight: bolder;
		color: white;
		border-radius: 0.5rem;
	}

	.addGrad {
			// position: fixed;
			width: 0.5rem,
			height: 0.5rem;
			font-size: 1rem;
			font-weight: 800;
			// box-shadow: 10px 10px 5px #aaaaaa;
			background-color: #ff2626;
			// justify-content: center;
			justify-self: center;
			// margin: 0.5rem 9.5rem 0 0;

			@media (min-width: 500px) {
				margin: 3rem 2rem 0 0;
				width: 150px;
			}
		}

	}
`;