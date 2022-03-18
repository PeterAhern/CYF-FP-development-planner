import Navbar from "../Components/Header/Navbar/Navbar";
import Tasks from "../Components/Tasks/Tasks";
import Search from "../Components/Search";
const MentorsHome = () => {
	return (
		<>
			<Navbar />
			<Search  />
			<h2> welcome mentor</h2>
			<Tasks />
		</>
	);
};
export default MentorsHome;
