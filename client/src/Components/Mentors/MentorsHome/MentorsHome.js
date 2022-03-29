import React, { useState } from "react";
import Navbar from "../../Header/Navbar/Navbar";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
import GraduateList from "../GraduateList/GraduateList";

const MentorsHome = ({ user_email }) => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);

	return (
		<>
			<Navbar user_email={user_email} />
			<h1> Welcome Mentor!</h1>
			<h3> Connect with graduates, give feedback, support growth!</h3>
			<GraduateList
				mentorEmail={user_email}
				addGradRefresh={addGradRefresh}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
			<AllGraduates
				mentorEmail={user_email}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
		</>
	);
};
export default MentorsHome;
