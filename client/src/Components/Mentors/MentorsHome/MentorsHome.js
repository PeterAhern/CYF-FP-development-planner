import React, { useState } from "react";
import Navbar from "../../Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
import GraduateList from "../GraduateList/GraduateList";

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
