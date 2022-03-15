import Card from "../Components/UI/Card/Card";
import TaskForm from "../Components/TaskForm/TaskForm";
import Tasks from "../Components/Tasks/Tasks";

const MyPlan = () => {
let formChange;
const reFetch = (formReFetch) => {
	formChange = formReFetch;
};
return (
	<main role="main">
		<Card>

			<h1>Home</h1>
			<p>
				Welcome to your planning center, from here, you can view and add new tasks to be done.
			</p>

			<div>
			<TaskForm reFetch={reFetch} />
			</div>

			<h1>Tasks</h1>
			<Tasks formChange={formChange} />
		</Card>
	</main>
);
};

export default MyPlan;
