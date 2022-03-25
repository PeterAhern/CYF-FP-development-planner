import { useState, useEffect, useCallback } from "react";
import "./Goal.css";
const Goal = ( { graduateEmail } ) => {
	const [clicked, setClicked] = useState(false);
	const [goal, setGoal] = useState("");

	const fetchGradGoal = useCallback(async () => {
		try {
			const graduate = graduateEmail;
			const response = await fetch(`api/graduates/goal/${graduate}`);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const data = await response.json();
			let fetchedGoal = data[0].goal;
			if(fetchedGoal!==null){
			setGoal(fetchedGoal);
		}
		} catch (error) {
			console.log(error.message);
		}
	}, [graduateEmail]);

	useEffect(() => {
		fetchGradGoal();
	}, [fetchGradGoal]);

	const changeHandler = (e) => {
		setGoal(e.target.value);
	};


		const addGoalOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				// Accept: "application/json",
			},
			body: JSON.stringify( { goal: goal } ),
		};

		const updateGoal = async () => {
			setClicked(!clicked);
			let graduate = graduateEmail;
			if(clicked) {
			const response = await fetch(
				`api/graduates/goal/${graduate}`,
				addGoalOptions
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
		}
		};





	return (
		<>
			<h3 className="goal">{goal}</h3>
			<button onClick={updateGoal} className=" btn-sm button">
				{clicked ? <h6>Save</h6> : <h6>Edit Goal</h6>}
			</button>

			{clicked && (
				<input
					ref={(ref) => ref && ref.focus()}
					onFocus={(e) =>
						e.currentTarget.setSelectionRange(
							e.currentTarget.value.length,
							e.currentTarget.value.length
						)
					}
					type="text"
					name="goal"
					value={goal}
					onChange={changeHandler}
				></input>
			)}
		</>
	);
};
export default Goal;
