import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState( [
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'Javascript', isDone: true},
        {id: 3, title: 'HTML+CSS', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask (id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone ===true)
    }

    function changeFilter (value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />


        </div>
    );
}

export default App;
