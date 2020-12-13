import axios from 'axios';

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type UpdeteTaskTitleResponseType<T={}> = {
    data: T
    item: Array<UpdateTaskModelType>
    resultCode: number
    messages: Array<string>
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a77ea86a-925e-4bb9-81e9-a41d0c7337ce'
    }
})


export const todolistAPI = {
    getTodolist() {
        const promise = instance.get<Array<TodolistType>>(`todo-lists`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<UpdeteTaskTitleResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
        return promise
    },
}
