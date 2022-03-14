import Card from "../Components/UI/Card/Card";

import TaskForm from "../Components/TaskForm/TaskForm";

import Tasks from "../Components/Tasks/Tasks";

const MyPlan = () => {
	const triggerText = "Add New Task";
	const onSubmit = (event) => {
		event.preventDefault(event);
		//here we add the post details
	};

return (
	<main role="main">
		<Card>

			<h1>Home</h1>
			<p>
				Welcome to your planning center, from here, you can view and add new tasks to be done.
			</p>

			<div>
			<TaskForm onSubmit={onSubmit} />
			</div>

			<h1>Tasks</h1>
			<Tasks />
		</Card>
	</main>
);
};

export default MyPlan;
