import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    return (
    <div>
        <h3>
            <EditableSpan value={props.title} onChange={changeTodolistTitle} />
        <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>

            {error && <div className={"error-message"}>{error}</div> }
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => {props.removeTask(t.id, props.id)}
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeStatus(t.id, newIsDoneValue, props.id)
                }
                const onTitleChangeHandler = (newValue: string) => {
                    props.changeTaskTitle(t.id, newValue, props.id)
                }

                return <li key={t.id} className={t.isDone ? "is-done" : "" }>
                    <input type='checkbox' checked={t.isDone} onChange={onChangeHandler}/>
                    <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                    <button onClick={onClickHandler}>x
                    </button>
                </li>
            })}

        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>

);
}

export default Todolist;
