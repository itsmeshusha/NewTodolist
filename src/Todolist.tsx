import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import './App.css';
import {FilterValuesType} from './AppWithRedux'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";

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
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

const Todolist = React.memo(function (props: TodolistPropsType) {
    console.log("Todolist called")
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id,"all"), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id,"active"), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id,"completed"), [props.changeFilter, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={props.title} onChange={changeTodolistTitle}/>

                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>

                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <div>
                {props.tasks.map(t => {
                    return <Task task={t}
                                 todolistId={props.id}
                                 removeTask={props.removeTask}
                                 changeStatus={props.changeStatus}
                                 changeTaskTitle={props.changeTaskTitle}
                                 key={t.id}/>
                })}

            </div>
            <div>
                <Button variant={props.filter === "all" ? "outlined" : "text"}
                        onClick={onAllClickHandler}
                        color={'primary'}>All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler}
                        color={'secondary'}>Active
                </Button>
                <Button variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedClickHandler}
                        color={'default'}>Completed
                </Button>
            </div>
        </div>

    );
})

export default Todolist;
