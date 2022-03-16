import Card from "../Components/UI/Card/Card";
import TaskForm from "../Components/TaskForm/TaskForm";
import Tasks from "../Components/Tasks/Tasks";

import Navbar from "../Components/Header/Navbar/Navbar";

const MyPlan = () => {
return (
	<>
		<Navbar />
		<main role="main">
			<Card>
				<h1>Home</h1>
				<p>
					Welcome to your planning center, from here, you can view and add new
					tasks to be done.
				</p>

				<div>
					<TaskForm />
				</div>

				<h1>Tasks</h1>
				<Tasks />
			</Card>
		</main>
	</>
);
};

export default MyPlan;
