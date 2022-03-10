import React, { useState, useEffect, useCallback } from "react";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasksHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // must change route as per the full stack assignment
            const response = await fetch("http://localhost:3000/api/tasks");
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const data = await response.json();

            const loadedTasks = [];

            // writing data transformation logic for the data I am getting back from heroku postgres database

            for (const key in data) {
                loadedTasks.push({
                    id: data[key].task_id,
                    title: data[key].task_title,
                    due_date: data[key].due_date,
                    evidence: data[key].evidence,
                    status_id: data[key].status_id,
                });
            }

            setTasks(() => loadedTasks);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchTasksHandler();
    }, [fetchTasksHandler]);

    // Once post route on server is specifies on /api and a specific response is sent back, containing all tasks for a particular user, this can be implemented
    // also relying on the form for the task form Pete to connect here
    // async function addTaskHandler(task) {
    //     // we can add a try{}catch{} here, just keeping it short and focused to understand post requests

    //     // POST request to heroku postgres
    //     const response = await fetch(
    //     "http://localhost:3000/api/tasks",
    //     {
    //         method: "POST",
    //         body: JSON.stringify(task),
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //     }
    //     );
    //     // the reply that I get back from heroku, for now logging it, we can add logic once we specify what send back from the server side for POST route on /api
    //     const data = await response.json();
    //     console.log(data);
    // }
    let content = <p>Found no tasks.</p>;

    if (tasks.length > 0) {
        //   to be added when task form is completed
        // content = tasks.map((task) => <TasksList key={task.id} title={task.title} due_date={task.due_date} evidence={task.evidence} status_id={task.status_id}/>);
        content = tasks.map((task, index)=><h1 key={task[index].id}>{task[index].title}</h1>);
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <React.Fragment>
            {/* To be added once Task form is completed */}
        {/* <section>
            <AddTask onAddTask={addTaskHandler} />
        </section>
        <section>
            <button onClick={fetchTasksHandler}>Fetch Tasks</button>
        </section>*/}
        <section>{content}</section>
        </React.Fragment>
    );
};

export default Tasks;