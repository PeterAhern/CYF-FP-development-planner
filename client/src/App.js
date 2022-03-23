import { Route, Routes } from "react-router-dom";


import Registration from "./pages/registration";
import Plan from "./pages/plan";

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					exact
					element={<Registration />}
				/>
				<Route
					path="/plan"
					exact
					element={<Plan />} />
			</Routes>
		</>
	);
};


export default App;
