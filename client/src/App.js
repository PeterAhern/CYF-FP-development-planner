import { Route, Routes } from "react-router-dom";
import MyPlan from "./pages/MyPlan";
import Landing from "./pages/Landing";
import { useState } from "react";


// Importing components
import Navbar from "./Components/Header/Navbar/Navbar";

const App = () => {
	const [user, setUser] = useState(" ");
	const userChange=(user) =>(setUser(user));
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Landing user={userChange} />} />
				<Route path="/myPlan" element={<MyPlan user = { user } />} />
			</Routes>
		</>
	);
};

export default App;
