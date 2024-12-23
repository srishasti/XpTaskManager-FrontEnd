


const TaskBox = ({task,onComplete, onDelete}) => {

    return (

        <div>

            <span> <b>{task.taskname}</b> </span>
            <span> {task.taskDesc} </span>
            <span> {task.deadline} </span>
            <span> {task.difficulty} </span>

        
            { task.status !== "completed" && <button onClick={ () => onComplete(task.taskId)}>Complete</button> }
            
            
            <button onClick={() => onDelete(task.taskId)}> Delete </button>


        </div>

    )


}

export default TaskBox;