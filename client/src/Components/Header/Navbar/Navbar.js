import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Goal from "./Goal";
import DropdownOption from "./DropdownItem";
import Axios from "axios";

import "./NavBar.css";


import developmentSvg from "../../../Assets/svg/development.svg";
import logInOutSvg from "../../../Assets/svg/login-out.svg";
import cyfLogo from "../../../Assets/svg/cyfLogo.svg";


const NavigationMenu = ({ user_email }) => {

	const logoutHandler = () => Axios.post("/api/logout");

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">
						<img className="cyfLogo" src={cyfLogo} alt="CYF logo" />
					</Navbar.Brand>
					<Goal graduateEmail={user_email} />
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "150px" }}
							navbarScroll
						>
							<Nav.Link href="/plan">
								<DropdownOption href="/plan" leftIcon={developmentSvg}>
									Dev Planner
								</DropdownOption>
							</Nav.Link>
							<Nav.Link href="/" onClick={logoutHandler}>
								{/* <button onClick={logoutHandler}> */}
									<DropdownOption href="/" leftIcon={logInOutSvg}>
										Logout
									</DropdownOption>
								{/* </button>  */}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationMenu;