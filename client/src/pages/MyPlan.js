import Card from "../Components/UI/Card/Card";
import TaskForm from "../Components/TaskForm/TaskForm";
import Tasks from "../Components/Tasks/Tasks";
import Element from "../Components/Element/Element";
import "./MyPlan.css";

const MyPlan = () => {
return (
	<main role="main">
		<Card>
			<h1>Home</h1>
			<p>
				Welcome to your planning center, from here, you can view and add new
				tasks to be done.
			</p>
			<div className="elements">
				<Element id={1} name={"Technical"} />
				<Element id={2} name={"Job Search"} />
				<Element id={3} name={"Soft Skills"} />
			</div>

			{/* <div>
			<TaskForm />
			</div>

			<h1>Tasks</h1>
			<Tasks /> */}
		</Card>
	</main>
);
};

export default MyPlan;
