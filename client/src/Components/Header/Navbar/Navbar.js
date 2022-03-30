import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Goal from "./Goal";
import DropdownOption from "./DropdownItem";
import Axios from "axios";

import "./NavBar.css";

import developmentSvg from "../../../Assets/svg/development.svg";
import logInOutSvg from "../../../Assets/svg/login-out.svg";
import cyfLogo from "../../../Assets/svg/cyfLogo.svg";

const NavigationMenu = () => {
	const [loginStatus, setLoginStatus] = useState({
		status: false,
		user_email: "",
	});


	useEffect(() => {
		Axios.get("/api/login").then((response) => {
			console.log("response here: ");
			console.log(response);
			if (response.data.loggedIn == true) {
				setLoginStatus((prev) => {
					const currLoginStatus = { ...prev };
					currLoginStatus.status = true;
					currLoginStatus.user_email = response.data.user.user_email;
					return currLoginStatus;
				});
			}
		});
	}, [setLoginStatus]);

	const logoutHandler = () => Axios.post("/api/logout");

	return (
		<>
			<Navbar className="navigationMenu" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">
						<img className="cyfLogo" src={cyfLogo} alt="CYF logo" />
					</Navbar.Brand>
					<Goal graduateEmail={loginStatus.user_email} />
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
