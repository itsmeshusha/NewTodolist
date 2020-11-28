import React from 'react';
import './App.css';
import Todolist from "./Todolist";

function App() {

    const tasks1 = [
        {id: 1, title: 'React', isDone: false},
        {id: 2, title: 'Javascript', isDone: true},
        {id: 3, title: 'HTML+CSS', isDone: true}
    ]

    const tasks2 = [
        {id: 1, title: 'Yo', isDone: false},
        {id: 2, title: 'Hello', isDone: true},
        {id: 3, title: 'I am so happy', isDone: true}
    ]


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks1}/>
            <Todolist title={'Songs'} tasks={tasks2}/>

        </div>
    );
}

export default App;
