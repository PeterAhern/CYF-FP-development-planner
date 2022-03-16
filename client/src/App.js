import { Route, Routes } from "react-router-dom";
import MyPlan from "./pages/MyPlan";
import Landing from "./pages/Landing";

const App = () => (
	<>
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/myPlan" element={<MyPlan />} />
		</Routes>
	</>
);

export default App;
