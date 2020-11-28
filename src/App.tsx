import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState( [
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Javascript', isDone: true},
        {id: v1(), title: 'HTML+CSS', isDone: true}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask (id: string) {
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

    function addTask (title: string) {
        let task = {id: v1(), title: title, isDone: false}
        setTasks([task, ...tasks])
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />


        </div>
    );
}

export default App;
