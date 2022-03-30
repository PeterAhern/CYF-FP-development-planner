// import Card from "../../UI/Card/Card";
import Element from "../../Element/Element";
import "./MyPlan.css";
import Navbar from "../../Header/Navbar/Navbar";
import Tasks from "../../Tasks/Tasks";
import { useState } from "react";

const MyPlan = ({ user_email }) => {
	const [elementTasksId, setElementTasksId] = useState(1);
	const [refresh, setRefresh] = useState(true);

	return (
		<>
			<Navbar graduateEmail={user_email} />
			<section className="gradPlanPage">
				<main role="main" className="elementsSection">
					<p className="elementsText">
						Welcome to your planning center, from here, you can view and add new
						tasks to be done.
					</p>
					<div className="elements">
						<Element id={1} name={"Technical"} graduateEmail={user_email} />
						<Element id={2} name={"Job Search"} graduateEmail={user_email} />
						<Element id={3} name={"Soft Skills"} graduateEmail={user_email} />
					</div>
				</main>
				<div className="tasksSection">
					<Tasks
						userEmail={user_email}
						elementId={elementTasksId}
						refresh={refresh}
						refreshFunc={() => setRefresh(!refresh)}
					/>
				</div>
			</section>
		</>
	);
};

export default MyPlan;
