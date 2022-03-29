import Card from "../../UI/Card/Card";
import Element from "../../Element/Element";
import "./MyPlan.css";
import Navbar from "../../Header/Navbar/Navbar";
const MyPlan = ({ user_email }) => {
	return (
		<>
			<Navbar graduateEmail={user_email} />
			<main role="main">
				<Card>
					<p>
						Welcome to your planning center, from here, you can view and add new
						tasks to be done.
					</p>
					<h1>Elements to Success</h1>
					<div className="elements">
						<Element id={1} name={"Technical"} graduateEmail={user_email} />
						<Element id={2} name={"Job Search"} graduateEmail={user_email} />
						<Element id={3} name={"Soft Skills"} graduateEmail={user_email} />
					</div>
				</Card>
			</main>
		</>
	);
};

export default MyPlan;
