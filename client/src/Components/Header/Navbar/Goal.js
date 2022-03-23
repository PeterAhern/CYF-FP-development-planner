import { useState, useEffect } from "react";
import "./Goal.css";
const Goal = () => {
	const [clicked, setClicked] = useState(false);
	const [goal, setGoal] = useState("");
	const changeHandler = (e) => {
		setGoal(e.target.value);
	};
	useEffect(() => {
		setGoal(window.localStorage.getItem("goal"));
	}, []);

	useEffect(() => {
		window.localStorage.setItem("goal", goal);
	}, [goal]);
	return (
		<>
			<h3 className="goal">{goal}</h3>
			<button onClick={() => setClicked(!clicked)} className=" btn-sm button">
				{clicked ? <h6>save</h6> : <h6>Edit Goal</h6>}
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
