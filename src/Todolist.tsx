import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    function addTask() {
        if(title.trim() !== "") {
            props.addTask(title)
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
    <div className="Todolist">
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div> }
        </div>
        <ul>
            {props.tasks.map(t => {
                const onClickHandler = () => {props.removeTask(t.id)}
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    let newIsDoneValue = e.currentTarget.checked
                    props.changeStatus(t.id, newIsDoneValue)
                }

                return <li key={t.id} className={t.isDone ? "is-done" : "" }>
                    <input type='checkbox' checked={t.isDone} onChange={onChangeHandler}/>
                    <span>{t.title}</span>
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
