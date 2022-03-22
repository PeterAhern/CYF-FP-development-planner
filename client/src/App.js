import { Route, Routes } from "react-router-dom";

import Registration from "./pages/registration";
import Main from "./pages/main";



const App = () => {
	return (
		<>
			<Routes>
				<Route
					path="/registration"
					exact
					render={(props) => <Registration />}
				/>
				<Route path="/" exact render={(props) => <Main />} />
			</Routes>
		</>
	);
};


export default App;
