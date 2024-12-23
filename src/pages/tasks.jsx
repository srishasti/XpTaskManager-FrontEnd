import {useEffect, useState} from 'react'
import TaskBox from '../components/taskbox';
import axios from 'axios';


const Tasks = () => {
   
    const apiUrl = import.meta.env.VITE_API_URL;

    const [tasks, setTasks] = useState([]);


    useEffect(
        () => {

            console.log("going to get the api. hope it works");

            axios.get(`${apiUrl}/tasks`, {withCredentials :true,})
                .then( (response) => {
                    setTasks(response.data);
                })
                .catch(
                    (error) => {
                        console.log("ERROR")
                        alert("ERrror!!!");
                    }
                )
        },
        []
    );

    const handleComplete = () => {
        console.log("complete button clicked!")
    }
    const handleDelete = () => {
        console.log("delete button clicked")
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
                            return <TaskBox key={task.id} task = {task} onDelete={handleDelete} onComplete={handleComplete}></TaskBox>;
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
                            return <TaskBox key={task.id} task = {task} onDelete={handleDelete} onComplete={handleComplete}></TaskBox>
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
                            return <TaskBox key={task.id} task = {task} onDelete={handleDelete}></TaskBox>
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
        {content}

      </div>  
    );
    
};
export default Tasks;
