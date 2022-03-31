import React, { useState } from "react";
import Navbar from "../../Header/Navbar/Navbar";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
import GraduateList from "../GraduateList/GraduateList";
import { Wrapper } from "../../Graduates/GraduatesPlan/MyPlan.styles";
import "./MentorsHome.css";
const MentorsHome = ({ user_email }) => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);

	return (
		<Wrapper>
			<Navbar user_email={user_email} />
			<div className="main">
				<AllGraduates
					mentorEmail={user_email}
					gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
				/>
				<GraduateList
					mentorEmail={user_email}
					addGradRefresh={addGradRefresh}
					gradRefreshFunc={() => setAddGradRefresh(!addGradRefresh)}
				/>
			</div>
		</Wrapper>
	);
};
export default MentorsHome;
