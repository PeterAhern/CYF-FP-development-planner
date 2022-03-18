import { Route, Routes } from "react-router-dom";
import MyPlan from "./pages/MyPlan";
import Landing from "./pages/Landing";
import { useState } from "react";



const App = () => {
	// Managing the user object containing the details of the signedin/signedup user
	const [currUser, setCurrUser] = useState("");

	// Using the userChange function to pull the user from the child component (Landing)
	const userChange=(user) =>(setCurrUser(user));
	console.log(currUser);
	return (
		<>
			<Routes>
				{/* This leads to the landing page where the client can signin/signup */}
				<Route path="/" element={<Landing userChange={userChange} />} />

				{/* This leads to the myPlan page for the user */}
				<Route path="/myPlan" element={<MyPlan currUser={currUser} />} />
			</Routes>
		</>
	);
};


export default App;
