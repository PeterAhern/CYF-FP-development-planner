import React, { useState } from "react";
import Navbar from "../Components/Header/Navbar/Navbar";
import Tasks from "../Components/Tasks/Tasks";
import AllGraduates from "../Components/AllGraduates";
import GraduateList from "../Components/GraduateList";

const MentorsHome = () => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);

	return (
		<>
			<Navbar />
			<h1> Welcome Mentor!</h1>
			<h3> Connect with graduates, give feedback, support growth!</h3>
			<GraduateList
				addGradRefresh={addGradRefresh}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
			<AllGraduates
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
			<h1> All Tasks</h1>
			<Tasks />
		</>
	);
};
export default MentorsHome;
