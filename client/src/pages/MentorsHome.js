import Navbar from "../Components/Header/Navbar/Navbar";
import Tasks from "../Components/Tasks/Tasks";
import Search from "../Components/Search";
import AllUsers from "../Components/AllUsers";
const MentorsHome = () => {
	return (
		<>
			<Navbar />
			<AllUsers />
			<h2> welcome mentor</h2>
			<Tasks />
		</>
	);
};
export default MentorsHome;
