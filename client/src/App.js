import { Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";


import Registration from "./pages/registration";
import Plan from "./pages/plan";
import UserProfile from "./Components/UserProfile/UserProfile";
import MentorGuide from  "../src/pages/MentorsGuide";

import ErrorPage from "./pages/ErrorPage";

const App = () => {
	return (
		<div className="landingPage">
			<Routes>
				<Route path="/" exact element={<Registration />} />
				<Route path="/plan" exact element={<Plan />} />
				<Route path="/guide" exact element={<MentorGuide />} />
				<Route path={"/profile"} exact element={<UserProfile />} />
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</div>
	);
};


export default App;
