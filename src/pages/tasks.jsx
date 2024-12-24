import {useEffect, useState} from 'react'
import TaskBox from '../components/taskbox';
import axios from 'axios';


const Tasks = () => {
   
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials=true;

    const [tasks, setTasks] = useState([]);
    const [toggleAddTask, setToggleAddTask] = useState(false);
    const [newTask, setNewTask] = useState( {
        taskname : "",taskDesc : "", deadline : "",difficulty : "" 
    });

    useEffect(
        () => {

            axios.get(`${apiUrl}/tasks`, {withCredentials :true,})
                .then( (response) => {
                    setTasks(response.data);
                })
                .catch(
                    (error) => {
                        console.log("ERROR")
                    }
                )
        },
        []
    );

    const handleComplete = async (id) => {
        console.log("complete button clicked! "+id);
        try{
            await axios.put(`${apiUrl}/tasks/${id}` , {withCredentials:true,});
            setTasks((tasks)=>
                tasks.map((task)=> task.taskId === id ? {...task, status : "completed"} : task )
            );

            console.log("completed "+id);
        }
        catch(error){ console.log("error");}
    }
    const handleDelete = async (id) => {
        console.log("delete button clicked "+id);
        try{
            await axios.delete(`${apiUrl}/tasks/${id}`, {withCredentials:true,});
            setTasks(tasks.filter(task => task.taskId !== id));
            console.log("deleted "+id);
        }
        catch(error){console.log("error");}
    }

    const handleAdd = async(e) =>{
        e.preventDefault();
        console.log("task ready to add");
        console.log(newTask);

        try{
            const response = await axios.post(`${apiUrl}/tasks`,newTask, {headers: { 'Content-Type':'application/json',}, withCredentials:true,});
            setTasks((tasks)=> [...tasks, response.data] );
            console.log('added!')
        }
        catch(error){console.log("error");}

    }


    let content;

    if(tasks.length == 0) content = <span> No Tasks Available </span>
    else{

        const pendingTasks = tasks.filter(task => task.status === "pending");
        const completedTasks = tasks.filter(task => task.status === "completed");
        const overdueTasks = tasks.filter(task => task.status === "overdue");

        content = (

            <div>

            {
                pendingTasks.length > 0 && (
                    <> 
                    <h2> Pending Tasks </h2>
                    {
                        pendingTasks.map(task => {
                            return <TaskBox key={task.taskId} task = {task} onDelete={handleDelete} onComplete={handleComplete}></TaskBox>;
                        })
                    }
                    </>
                )
                
            }

            {
                overdueTasks.length > 0 && (
                    <> 
                    <h2> Overdue Tasks </h2>
                    {
                        overdueTasks.map(task => {
                            return <TaskBox key={task.taskId} task = {task} onDelete={handleDelete} onComplete={handleComplete}></TaskBox>
                        })
                    }
                    </>
                )
                
            }

            {
                completedTasks.length > 0 && (
                    <> 
                    <h2> Completed Tasks </h2>
                    {
                        completedTasks.map(task => {
                            return <TaskBox key={task.taskId} task = {task} onDelete={handleDelete}></TaskBox>
                        })
                    }
                    </>
                )
                
            }

            </div>

        );

    }
    

    return (
      <div>

        <h1> Tasks </h1>

        <button onClick={ () =>
            toggleAddTask === true ? setToggleAddTask(false) : setToggleAddTask(true)
        }> Add Task </button>
        <br></br>

        {
            toggleAddTask === true && (
            <form onSubmit={handleAdd}> 
                <label> Taskname : </label> 
                <label><input type = "text" value = {newTask.taskname} 
                    onChange={(e)=> setNewTask((prev) =>({ ...prev,taskname: e.target.value })) } required/>
                </label>
                <label> Task Desc : </label>
                <input type = "text" value = {newTask.taskDesc} 
                    onChange={(e)=> setNewTask((prev)=> ({...prev, taskDesc: e.target.value}) )}/>

                <label> Difficulty </label>
                <select value = {newTask.difficulty} 
                    onChange={(e)=> setNewTask((prev)=> ({...prev,difficulty : e.target.value}))}>
                    <option value = "easy"> Easy </option>
                    <option value = "medium"> Medium </option>
                    <option value = "hard"> Hard </option>
                </select>

                <label> Deadline </label>
                <input type = "date" value = {newTask.deadline} 
                    onChange={(e)=> setNewTask((prev)=>({...prev,deadline : e.target.value}))}/>

                <button type="submit"> Submit </button>
            </form>
            )
        }

        {content}

      </div>  
    );
    
};
export default Tasks;
