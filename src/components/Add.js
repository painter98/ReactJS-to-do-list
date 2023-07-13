import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { addTask } from '../slice/taskSlice';

function Add() {
    let [title,setTitle] = useState('');
    let [desc,setDesc] = useState('');
    let [status,setStatus] = useState('');
    let dispatch = useDispatch();

    let handleTask = (e)=>{
        e.preventDefault();
        console.log('handle task');

        if(title && desc && status){

            
            dispatch(
                addTask({
                    title,
                    desc,
                    status
                })
            )

            if(localStorage.getItem('tasks')){
                let totalTasks = JSON.parse(localStorage.getItem('tasks'));
                console.log(totalTasks);

                localStorage.setItem('tasks',JSON.stringify(
                    [...totalTasks,{title,
                        desc,
                        status}
                    ])); 
            }
            else{
                localStorage.setItem('tasks',JSON.stringify(
                    [{
                        title,
                        desc,
                        status
                    }])); 
            }
           
        }
        else{
            alert('Enter all the input fields')
        }
        setTitle('');
        setDesc('');
        setStatus('');
    }

  return (
   <form onSubmit={handleTask}
   className="flex flex-col gap-10 m-auto text-start w-2/6 p-10 border-black border-2">
        <h1 className="text-5xl text-center">Task</h1>
        <div>
            <label htmlFor='task' className="text-3xl">Title</label>
            <br/>
            <input 
                type='text' 
                value={title}
                placeholder='Enter the Task' 
                className="p-3 border-b-2 border-black-400 w-full outline-none" 
                onChange={(e)=>setTitle(e.target.value)}
                id='task'/>
        </div>
        <div>
            <label htmlFor='desc' className="text-3xl">Description</label>
            <br/>
            <input 
                type='text' 
                value={desc}
                placeholder='Enter the Description' 
                className="p-3 border-b-2 border-black-400 w-full outline-none" 
                onChange={(e)=>setDesc(e.target.value)}
                id='desc'/>
        </div>
        <div>
            <label htmlFor='status' className="text-3xl">Status</label>
            <br/>
            <select onChange={(e)=>setStatus(e.target.value)}
            id='status'
            value={status}
            className="p-3 border-b-2 border-black-400 w-full outline-none" >
                <option></option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>
        </div>
        <button type='submit' className="bg-black text-white p-2">Add Task</button>
   </form>
  )
}

export default Add
