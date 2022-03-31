import React, { useState } from "react";
import Navbar from "../../Header/Navbar/Navbar";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
import GraduateList from "../GraduateList/GraduateList";
import "../../Graduates/GraduatesPlan/MyPlan.css";
const MentorsHome = ({ user_email }) => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);

	return (
		<div>
			<Navbar user_email={user_email} />


			<GraduateList
				mentorEmail={user_email}
				// className="elements"
				addGradRefresh={addGradRefresh}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>

			<AllGraduates
				mentorEmail={user_email}
				gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
			/>
		</div>
	);
};
export default MentorsHome;
