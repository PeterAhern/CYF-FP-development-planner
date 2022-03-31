import { CardStyles } from "./Card.styles";
import { useState } from "react";

const Card = (props) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleMode = () => setDarkMode(()=> !darkMode);

	return (
		<CardStyles>
			<div
				className={darkMode && props.toggle ? "cardDark" : "card"}
				onClick={toggleMode}
			>
				{props.children}
			</div>
		</CardStyles>
	);
};

export default Card;