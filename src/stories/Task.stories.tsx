import React from 'react';

import {action} from '@storybook/addon-actions'
import Task from "../Task";

export default {
    title: 'Task stories',
    component: Task
}

const removeCallback = action('Remove button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task clicked')
const changeTitleCallback = action('Title changed inside Task clicked')

export const TaskBaseExample = (props: any) => {
    return (<div>
            <Task task={{id: '1', isDone: true, title: 'CSS'}}
                  todolistId={'todolistId1'}
                  removeTask={removeCallback}
                  changeStatus={changeStatusCallback}
                  changeTaskTitle={changeTitleCallback}/>
            <Task task={{id: '2', isDone: false, title: 'JS'}}
                  todolistId={'todolistId2'}
                  removeTask={removeCallback}
                  changeStatus={changeStatusCallback}
                  changeTaskTitle={changeTitleCallback}/>
        </div>
    )
}

