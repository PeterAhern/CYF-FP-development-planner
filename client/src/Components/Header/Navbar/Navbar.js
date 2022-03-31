import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Goal from "./Goal";
import DropdownOption from "./DropdownItem";
import Axios from "axios";

import { Wrapper } from "./NavBar.styles";

import developmentSvg from "../../../Assets/svg/development.svg";
import logInOutSvg from "../../../Assets/svg/login-out.svg";
import cyfLogo from "../../../Assets/svg/cyfLogo.svg";

const NavigationMenu = () => {
	const [loginStatus, setLoginStatus] = useState({
		status: false,
		user_email: "",
	});

	const [mentorAccess, setMentorAccess] = useState(false);

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

	useEffect(() => {
		Axios.get(`api/graduate/${loginStatus.user_email}`).then((response) =>
			setMentorAccess(response.data[0].mentor_access)
		);
	}, [loginStatus.user_email]);
	console.log(loginStatus.user_email);


	const logoutHandler = () => Axios.post("/api/logout");


	console.log(mentorAccess);

	return (
		<Wrapper>
			<Navbar className="navigationMenu" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">
						<img className="cyfLogo" src={cyfLogo} alt="CYF logo" />
					</Navbar.Brand>
					<Goal graduateEmail={loginStatus.user_email} />
					<Navbar.Toggle className="navbarToggle" aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							{mentorAccess && (
								<Nav.Link href="/plan">
									<DropdownOption href="/plan" leftIcon={developmentSvg}>
										Mentor Guide
									</DropdownOption>
								</Nav.Link>
							)}
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
		</Wrapper>
	);
};

export default NavigationMenu;
