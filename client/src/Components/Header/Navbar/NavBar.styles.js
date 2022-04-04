import styled from "styled-components";

export const NavBarStyles = styled.div`
	display: flex;

	.navigationMenu {
		background-color: #f5f5f5;
		width: 100%;
	}

	.me-auto {
		display: flex;
		width: 150px;
		justify-content: flex-end;
		height: 80px;
	}

	.link {
		display: inline;
	}

	.none {
		display: none;
	}

	.navbarToggle {
		background-color: pink;
	}

	@media (max-width: 800px) {
		.me-auto {
			display: none;
		}
	}
	.guide {
		background: blue;
	}
	.another {
		display: none;
	}

	.logout {
		position: fixed;
		right: 0;
		top: 1rem;
		background-color: transparent;
		background: transparent;
	}

	Navbar.Brand a {
		margin-left: 2rem;
	}

	.divMentorGuide {
		align-items: center;
	}

	.mentorGuide {
		font-size: 1.2rem;
		color: #ff2626;
		text-align: center;
		position: fixed;
		right: 5rem;
		top: 2rem;
		margin-right: 2rem;
	}

	.mentorGuide2 {
		font-size: 1.2rem;
		color: #ff2626;
		text-align: center;
		position: fixed;
		right: 5rem;
		top: 2rem;
		margin-right: 2rem;
	}

	.mentorGuide:hover {
		color: white;
		background-color: #ff2626;
		cursor: pointer;
	}

	.mentorGuide2:hover {
		color: white;
		background-color: #ff2626;
		cursor: pointer;
	}
`;
















