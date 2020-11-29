import React, {useState} from 'react';
import './App.css';
import Todolist, { TaskType } from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {

    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: 'React', isDone: false},
    //     {id: v1(), title: 'Javascript', isDone: true},
    //     {id: v1(), title: 'HTML+CSS', isDone: true}
    // ])


    let todolistId1 = v1()
    let todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all'
        }
    ])

    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Javascript', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true}
        ]
    })



    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }



    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    return (
        <div className="App">
            {todolists.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                let tasksForTodolist = allTodolistTasks

                if (tl.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                />
            })
            }
        </div>
    )
}

            export default App;
