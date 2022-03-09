import classes from "./Card.module.css";
import { useState } from "react";

const Card = (props) => {
	const [darkMode, setDarkMode] = useState(false);

	const toggleMode = () => setDarkMode(()=> !darkMode);

	return <div className={darkMode ? classes.cardDark : classes.card} onClick={toggleMode}>{props.children}</div>;
};

export default Card;