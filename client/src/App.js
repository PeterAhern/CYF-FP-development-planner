import { Route, Routes } from "react-router-dom";
import MyPlan from "./pages/MyPlan";
import Landing from "./pages/Landing";

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
      <Route path="/" element={<Landing />} />
      <Route path="/myPlan" element={<MyPlan />} />
	  </Routes>
	</>

);

export default App;
