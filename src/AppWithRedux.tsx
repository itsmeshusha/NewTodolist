import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    let todolistId1 = v1()
    let todolistId2 = v1()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = RemoveTaskAC(id, todolistId)
        dispatch(action)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const action = AddTaskAC(title, todolistId)
        dispatch(action)
    }, [])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = ChangeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = ChangeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        const action = ChangeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])



    const removeTodolist = useCallback((id: string) => {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)

    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = ChangeTodolistTitleAC(id, title)
        dispatch(action)
    }, [])

    return (
        <div className="App">
            <AppBar position={"static"}>

                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>


                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks


                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                        </Paper>
                        </Grid>
                    })
                }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
