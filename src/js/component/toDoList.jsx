import { object } from "prop-types";
import React, { useState, useRef, useEffect } from "react";

//create your first component
const ToDo = () => {

    const [task, setTask] = useState('');
    const [taskArray, setTaskArray] = useState([]);
    const [status, setStatus] = useState("No tasks, add a task");

    const inputRef = useRef(null);

    const getTasks = () => {
        fetch("https://playground.4geeks.com/todo/users/ConnorC")
        .then((response)=>{
            if (response.status === 404 && response.status !== 400) {
                createUser();
            }
            return response.json()})
        .then((data)=>{
            console.log(data);
            setTaskArray(data.todos)})
        .catch((error)=>console.log(error))
    }

    const createUser = () => {
        fetch("https://playground.4geeks.com/todo/users/ConnorC", {
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            },
            // body: JSON.stringify([])
        })
        .then((response)=>{
            // console.log(response);
            if(response.status === 201){
                getTasks();
            }
            return response.json()
        })
        .then((data)=>console.log(data))
        .catch((error)=>console.log(error))
    }

    const createTask = (task) => {
        console.log(task);
        fetch("https://playground.4geeks.com/todo/todos/ConnorC", {
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                task
            )
        })
        .then((response)=>{
            return response.json()
        })
        .then((data)=>getTasks())
        .catch((error)=>console.log(error))
    }

    useEffect(() => {
        // inputRef.current.focus();
        getTasks();
        // createUser();
        
    }, []);

    const handleSubmit = (task) => {
        // e.preventDefault();
        if (task === '') {
            alert("Please enter a task")
        }
        else {
            const newObjectTask = {
                label: task,
                is_done: false
            }
            createTask(newObjectTask);
            // setTaskArray(taskArray.concat({label: task, done: false}));
            statusUpdate();
            // getTasks();
            
        }

        console.log("status updated");
    }

    const deleteTask = (id) => {
        fetch("https://playground.4geeks.com/todo/todos/"+id, {
            method:'DELETE',
            headers:{
                'Content-Type': "application/json"
            },
            // body: JSON.stringify([])
        })
        .then((response)=>{
            console.log(response);
            // return response.json();
        })
        .then((data)=>{
            console.log(data)
            getTasks()
        })
        .catch((error)=>console.log(error))
    }

    const statusUpdate = (arrayLength) => {
        if (arrayLength === 0) {
            setStatus("No tasks, add a task");
        } else {
            setStatus("");
        }
    }

    return (
        <div className="toDo">
            <input type="text" value={task} onKeyDown={(e) => { if (e.key === "Enter") { handleSubmit(task); } }} onChange={(e) => setTask(e.target.value)} ref={inputRef} />
            <button className="btn btn-secondary btn-lg" onClick={() => handleSubmit(task)}>Add</button>
            <h5> {status}</h5>

            <ul className="taskList">
                {taskArray.map((item, index) => (
                    <li className="taskList2" key={index}>
                        <div className="container">
                            <div className="task row">
                                <div className="col-10"><h2>{item.label}</h2></div>
                                <span className="col-2" onClick={() => deleteTask(item.id)}>x</span>
                            </div>
                        </div>


                    </li>
                ))}
            </ul>
            <div>{taskArray.length} item(s) left</div>
        </div>

    );
};

export default ToDo;
