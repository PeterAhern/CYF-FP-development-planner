import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";

// Importing components
import Navbar from "./Components/Navbar/Navbar";
import NavItem from "./Components/Navbar/NavItem";
import DropdownMenu from "./Components/Navbar/DropdownMenu";

import developmentSvg from "./Assets/svg/devPlanner.svg";

import navOptions from "./Assets/svg/selectDropdown.svg";

const App = () => (
	<>
		<Navbar>
			<NavItem href="/about/this/site" icon={developmentSvg} />
			<NavItem icon={navOptions}>
				<DropdownMenu />
			</NavItem>
		</Navbar>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/about/this/site" element={<About />} />
		</Routes>
	</>
);

export default App;
