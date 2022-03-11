import Card from "../Components/UI/Card/Card";
import { PopUpContainer } from "../Components/TaskForm/PopUpContainer";
import TaskForm from "../Components/TaskForm/TaskForm";




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
			{/* <PopUpContainer triggerText={triggerText} onSubmit={onSubmit} /> */}
			<TaskForm />
			</div>
		</Card>
	</main>
);
};

export default MyPlan;
