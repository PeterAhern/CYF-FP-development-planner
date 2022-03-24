import { Route, Routes } from "react-router-dom";


import Registration from "./pages/registration";
import Plan from "./pages/plan";
import UserProfile from "./Components/UserProfile/UserProfile";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" exact element={<Registration />} />
				<Route
					path="/plan"
					exact
					element={<Plan />}
				/>
				<Route
					path={"/profile"}
					exact
					element={<UserProfile />}
				/>
			</Routes>
		</>
	);
};


export default App;
