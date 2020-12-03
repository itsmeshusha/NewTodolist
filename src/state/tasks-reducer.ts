import {v1} from "uuid";
import {TasksStateType} from '../AppWithRedux'
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionType = RemoveTaskType | AddTaskType | ChangeTaskStatusType
    | ChangeTaskTitleType | RemoveTodolistActionType | AddTodolistActionType

type RemoveTaskType = {
    type: 'REMOVE-TASK'
    todolistId: string
    id: string
}
type AddTaskType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    id: string,
    title: string
}

const initialState = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.id);
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            let task = {id: v1(), title: action.title, isDone: false}
            let todolistTasks = stateCopy[action.todolistId]
            todolistTasks = [task, ...todolistTasks]
            return {...stateCopy, [action.todolistId]: todolistTasks}
        }
        case 'CHANGE-TASK-STATUS': {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistId]
            let newTaskArray = todolistTasks
                .map(t => t.id === action.id ? {...t, isDone: action.isDone}: t)
            stateCopy[action.todolistId] = newTaskArray
            return {...stateCopy}
        }
        case 'CHANGE-TASK-TITLE': {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistId]
            let newTaskArray = todolistTasks
                .map(t => t.id === action.id ? {...t, title: action.title}: t)
            stateCopy[action.todolistId] = newTaskArray
            return {...stateCopy}
        }
        case 'ADD-TODOLIST': {
            let stateCopy = {...state}
            stateCopy[action.todolistId]=[]
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK' as const,
        id: id,
        todolistId: todolistId
    }
}
export const AddTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK' as const,
        title: title,
        todolistId: todolistId
    }
}
export const ChangeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS' as const,
        id: id,
        isDone: isDone,
        todolistId: todolistId
    }
}
export const ChangeTaskTitleAC = (id: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE' as const,
        id: id,
        title: title,
        todolistId: todolistId
    }
}
