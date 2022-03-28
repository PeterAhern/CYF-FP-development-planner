import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import DropdownOption from "./DropdownItem";


import developmentSvg from "../../../Assets/svg/development.svg";
import logInOutSvg from "../../../Assets/svg/login-out.svg";
import cyfLogo from "../../../Assets/svg/cyfLogo.svg";



const NavigationMenu = () => {

	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">
						<img className="cyfLogo" src={cyfLogo} alt="CYF logo" />
					</Navbar.Brand>
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
							<Nav.Link href="/">
								<DropdownOption href="/" leftIcon={logInOutSvg}>
									Logout
								</DropdownOption>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);

};

export default NavigationMenu;