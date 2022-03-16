import { Route, Routes } from "react-router-dom";
import MyPlan from "./pages/MyPlan";
import Landing from "./pages/Landing";

const App = () => {
	// pass the value of the user email from Landing to My Plan
	const userEmail = (email) => email;

	return (
		<>
			<Routes>
				<Route path="/" element={<Landing userEmail={userEmail} />} />
				<Route path="/myPlan" element={<MyPlan userEmail={userEmail} />} />
			</Routes>
		</>
	);
}
;

export default App;
