import { Route, Routes } from "react-router-dom";
import MyPlan from "./pages/MyPlan";
import Landing from "./pages/Landing";


// Importing components
import Navbar from "./Components/Header/Navbar/Navbar";

const App = () => (
	<>
		<Navbar />
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/myPlan" element={<MyPlan />} />
		</Routes>
	</>
);

export default App;
