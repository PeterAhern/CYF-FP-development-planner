import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	/* background: #63d471; */
	height: 85px;
	display: flex;
	justify-content: space-between;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	z-index: 12;
	height: var(--nav-size);
	background-color: var(--bg);
	border-bottom: var(--border);
	/* Third Nav */
	/* justify-content: flex-start; */

	 .navbarNav {
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: flex-end;

	}
`;

export const NavLink = styled(Link)`
	color: #808080;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0 1rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #000000;
	}
`;

export const Bars = styled.div`
	display: none;
	color: #808080;
	@media screen and (max-width: 768px) {
		display: inline-block;
		/* position: fixed;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer; */
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -24px;
	/* Second Nav */
	/* margin-right: 24px; */
	/* Third Nav */
	/* width: 100vw;
  white-space: nowrap; */
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

