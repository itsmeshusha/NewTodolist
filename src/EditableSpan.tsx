import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    console.log("EditableSpan called")
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
    ? <TextField variant={"outlined"} value={title} autoFocus onChange={changeTitle} onBlur={activateViewMode} />
    : <span onDoubleClick={activateEditMode}>{props.value}</span>
})

export default EditableSpan;