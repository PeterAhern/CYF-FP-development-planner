import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import Goal from "./Goal";
import DropdownOption from "./DropdownItem";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { NavBarStyles } from "./NavBar.styles";
import developmentSvg from "../../../Assets/svg/development.svg";
// import logInOutSvg from "../../../Assets/svg/login-out.svg";
import cyfLogo from "../../../Assets/svg/cyfLogo.svg";
import LogRed from "../../../Assets/svg/logoutRed.svg";

const NavigationMenu = () => {
	const [loginStatus, setLoginStatus] = useState({
		status: false,
		user_email: "",
	});

	const [mentorAccess, setMentorAccess] = useState(false);
	const [direct, setDirect] = useState("");
	const location = useLocation();

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
	const handleClick1 = () => {
		
			setDirect("/guide");
	
	};
	const handleClick2 = () => {
		
			setDirect("/plan");
		
	};

	return (
		<NavBarStyles>
			<Navbar className="navigationMenu" expand="lg">
				<Container fluid>
					<Navbar.Brand href="#">
						<a href="https://syllabus.codeyourfuture.io/">
							<img className="cyfLogo" src={cyfLogo} alt="CYF logo" />
						</a>
					</Navbar.Brand>
					{/* <Goal graduateEmail={loginStatus.user_email} /> */}
					<Navbar.Toggle
						className="navbarToggle"
						aria-controls="navbarScroll"
					/>
					<Navbar.Collapse id="navbarScroll">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							{mentorAccess && (
								<>
									{location.pathname !== "/guide" && (
										<Nav.Link
											onClick={handleClick1}
											href={direct}
											className="divMentorGuide"
										>
											<DropdownOption href={direct}>
												<p className="mentorGuide">Mentor Guide</p>
											</DropdownOption>
										</Nav.Link>
									)}
									{location.pathname !== "/plan" && (
										<Nav.Link
											onClick={handleClick2}
											className="divMentorGuide"
											href={direct}
										>
											<DropdownOption href={direct}>
												<p className="mentorGuide2">Home</p>
											</DropdownOption>
										</Nav.Link>
									)}
								</>
							)}
							<Nav.Link className="logout" href="/" onClick={logoutHandler}>
								<DropdownOption href="/" leftIcon={LogRed} />
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</NavBarStyles>
	);
};

export default NavigationMenu;
