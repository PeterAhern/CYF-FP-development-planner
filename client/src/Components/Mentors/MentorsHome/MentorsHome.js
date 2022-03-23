import React, { useState } from "react";
import Navbar from "../../Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
import GraduateList from "../GraduateList/GraduateList";

const MentorsHome = ({ mentorEmail }) => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);

	return (
		<>
			<Navbar />
			<h1> Welcome Mentor!</h1>
			<h3> Connect with graduates, give feedback, support growth!</h3>
			<GraduateList
				mentorEmail={mentorEmail}
				addGradRefresh={addGradRefresh}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
			<AllGraduates
				mentorEmail={mentorEmail}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
			<h1> All Tasks</h1>
			<Tasks />
		</>
	);
};
export default MentorsHome;
