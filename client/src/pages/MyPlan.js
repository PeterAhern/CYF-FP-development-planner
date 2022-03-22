import { useState, useEffect } from "react";
import Card from "../Components/UI/Card/Card";
import Element from "../Components/Element/Element";
import "./MyPlan.css";
import Navbar from "../Components/Header/Navbar/Navbar";
const MyPlan = (props) => {
	const [clicked, setClicked] = useState(false);
	const [goal, setGoal] = useState("");
	const changeHandler = (e) => {
		setGoal(e.target.value);
	};
	useEffect(() => {
		setGoal((window.localStorage.getItem("goal")));
	}, []);

	useEffect(() => {
		window.localStorage.setItem("goal", goal);
	}, [goal]);
	//  const h = goal;
	return (
		<>
			<Navbar />
			<main role="main">
				<Card>
					<h1>{goal}</h1>
						<button
							onClick={() => setClicked(!clicked)}
							className="btn btn-danger btn-sm"
						>
							{clicked ? <h6>save</h6> : <h6>Edit</h6>}
						</button>

					{clicked && (
						<input
							type="text"
							name="goal"
							value={goal}
							onChange={changeHandler}
						></input>
					)}
					<p>
						Welcome to your planning center, from here, you can view and add new
						tasks to be done.
					</p>
					<h1>Elements to Success</h1>
					<div className="elements">
						<Element id={1} name={"Technical"} user={props.user} />
						<Element id={2} name={"Job Search"} user={props.user} />
						<Element id={3} name={"Soft Skills"} user={props.user} />
					</div>
				</Card>
			</main>
		</>
	);
};

export default MyPlan;
