import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (id: string, todolistId: string) => void
    changeStatus: (id: string,newIsDoneValue: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
}

const Task = React.memo(function(props: TaskPropsType) {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.removeTask, props.task.id, props.todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.todolistId)
    }, [props.changeStatus, props.task.id, props.todolistId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>

    <Checkbox
        checked={props.task.isDone}
        color={"primary"}
        onChange={onChangeHandler} />
    <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>

    <IconButton onClick={onClickHandler}>
        <Delete/>
    </IconButton>
</div>
})

export default Task;