import React, { useState } from "react";
import Navbar from "../../Header/Navbar/Navbar";
import AllGraduates from "../ViewAllGraduates/AllGraduates";
import GraduateList from "../GraduateList/GraduateList";
import { MyPlanStyles } from "../../Graduates/GraduatesPlan/MyPlan.styles";
import { MentorsHomeStyle } from "./MentorsHome.styles";

const MentorsHome = ({ user_email }) => {
	const [addGradRefresh, setAddGradRefresh] = useState(true);

	return (
		<MyPlanStyles>
			<MentorsHomeStyle>
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
			</MentorsHomeStyle>
		</MyPlanStyles>
	);
};
export default MentorsHome;
