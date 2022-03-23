import Navbar from "../../../Components/Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
// import Search from "../Components/Search";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
const MentorsHome = () => {
	return (
		<>
			<Navbar />
			<AllGraduates />
			<h2> welcome mentor</h2>
			<Tasks />
		</>
	);
};
export default MentorsHome;