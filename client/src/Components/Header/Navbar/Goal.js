import { useState, useEffect, useCallback } from "react";
import { Wrapper } from "./Goal.styles";
const Goal = ( { graduateEmail } ) => {
	const [clicked, setClicked] = useState(false);
	const [goal, setGoal] = useState("");

	const fetchGradGoal = useCallback(async () => {
		if (clicked) {
			try {
				// const graduate = graduateEmail;
				const response = await fetch(
					`api/graduates/goal/${graduateEmail}`
				);
				if (!response.ok) {
					throw new Error("Something went wrong!");
				}
				const data = await response.json();
				console.log("the data mystery: ", data);
				let fetchedGoal = data[0].goal;
				if(fetchedGoal!==null){
				setGoal(fetchedGoal);
			}
			} catch (error) {
				console.log(error.message);
			}
		}
	}, [graduateEmail, clicked]);

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
			if(clicked) {
			const response = await fetch(
				`api/graduates/goal/${graduateEmail}`,
				addGoalOptions
			);
			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
		}
		};





	return (
		<Wrapper>
			<h3 className="goal">{goal}</h3>
			<button onClick={updateGoal} className="button">
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
					className="goalInput"
				></input>
			)}
		</Wrapper>
	);
};
export default Goal;
