
// Styling
import classes from "./Task.module.css";

// Card for general styling from UI
import Card from "../UI/Card/Card";

const Task = (props) => {

    return (<Card>
        <h2>{props.task_title}</h2>

    </Card>);

};

export default Task;