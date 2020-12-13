import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a77ea86a-925e-4bb9-81e9-a41d0c7337ce'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('222')
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId='da73f528-6221-4197-97e5-65ee58458ab7'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e629dcff-ce5c-4037-9ac1-9f631a645fc6'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e629dcff-ce5c-4037-9ac1-9f631a645fc6'
        todolistAPI.createTask(todolistId, 'new task')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        const taskId = ''
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UptateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        const taskId = ''
        todolistAPI.updateTask(todolistId, taskId, 'RRRR')
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

