import Navbar from "../Components/Header/Navbar/Navbar";
import Tasks from "../Components/Tasks/Tasks";
import AllGraduates from "../Components/AllGraduates";
import MenteeList from "../Components/GraduateList";

const MentorsHome = () => {
	return (
		<>
			<Navbar />
			<h1> Welcome Mentor!</h1>
			<h3> Connect with graduates, give feedback, support growth!</h3>
			<AllGraduates />
			<MenteeList />
			<h1> All Tasks</h1>
			<Tasks />
		</>
	);
};
export default MentorsHome;
