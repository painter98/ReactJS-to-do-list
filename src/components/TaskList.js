import React,{ useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { deleteTask, updateTask } from '../slice/taskSlice';
import Input from './Input';


function TaskList({taskArray}) {
    let tasks = useSelector(state=>state.task.task);
    let dispatch = useDispatch();

    console.log('in list',typeof tasks,tasks);

    let handleEdit = (update,idx) => {
        console.log('editing');
        let newTasks = [...tasks];
        newTasks[idx] = update;

        console.log(newTasks);

        dispatch(
            updateTask(newTasks)
        )

        if(localStorage.getItem('tasks')){
            localStorage.setItem('tasks',JSON.stringify([...newTasks])); 
        }
    }

    let handleDelete = (idx) => {
        let newList = tasks.filter((_,index)=>index!==idx);
       
        console.log('deleting',tasks);
        dispatch(
            deleteTask(newList)
        )

        if(localStorage.getItem('tasks')){
            localStorage.setItem('tasks',JSON.stringify([...newList])); 
        }
    }

  return (
      <ul className="flex flex-wrap justify-start gap-2 my-28 mx-8">
        {tasks.map((task,idx)=>{
            return <li key={idx} className=" w-96 border-2 border-green-700 p-2 flex flex-col gap-3">
                <List 
                    idx={idx} 
                    task={task} 
                    deletetask={handleDelete} 
                    edittask={handleEdit}
                />
            </li>
        })}
      </ul>
  )
}

export function List({idx,task,deletetask,edittask}){
    let [title,setTitle] = useState(task.title);
    let [desc,setDesc] = useState(task.desc);
    let [status,setStatus] = useState(task.status);
    let [isEditing,setIsEditing] = useState(false);


    let handleEdit = () => {
        setIsEditing(true);
    }

    let handleDelete = (idx) => {
        deletetask(idx);
    }

    let handleSave = () => {
        setIsEditing(false);
        let update = {
            title,
            desc,
            status
        }

        edittask(update,idx);
    }
    return(
            <>
                {isEditing?
                    <div className="flex flex-col gap-3 m-auto text-start p-2 w-4/6">
                        <Input 
                            label={'Title'} 
                            value={title} 
                            onchange={setTitle} 
                            styles={"space-x-4"} 
                            inputstyle={"px-2 w-full outline-none"}
                        />
                         <Input 
                            label={'Description'} 
                            value={desc} 
                            onchange={setDesc} 
                            styles={"space-x-4"} 
                            inputstyle={"px-2 w-full outline-none"}
                        />
                        <div className="space-x-3">
                            <label>Status</label>
                            <br/>
                            <select onChange={(e)=>setStatus(e.target.value)}
                            value={status}
                            className="px-2 w-full outline-none">
                                <option></option>
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                            </select>
                        </div>
                        <div className="space-x-4">
                            <button 
                                className="bg-blue-600 text-white px-6 py-1.5"
                                onClick = {handleSave}
                            >Save</button>
                            <button 
                                className="bg-blue-600 text-white px-6 py-1.5"
                                onClick = {()=>setIsEditing(false)}
                            >Cancel</button>
                        </div>
                    </div>:
                    (<div className="w-4/6 space-y-4 m-auto p-9">
                        <p className="text-3xl">{task.title}</p>
                        <p className="text-xl">{task.desc}</p>
                        <p className="text-xl">{task.status}</p>
                    <div className="space-x-4">
                        <button 
                            className="bg-blue-600 text-white px-4 py-2"
                            onClick={()=>handleEdit()}>
                            Edit
                            </button>
                        <button 
                            className="bg-blue-600 text-white px-6 py-2"
                            onClick={()=>handleDelete(idx)}>
                            Delete
                            </button>
                    </div>
                </div>)}
            </>
    )
}

export default TaskList
