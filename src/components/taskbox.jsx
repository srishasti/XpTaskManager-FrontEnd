


const TaskBox = ({task,onComplete, onDelete}) => {

    return (

        <div>

            <h3> {task.taskname} </h3>
            <p> {task.taskDesc} </p>
            <p> {task.deadline} </p>
            <p> {task.difficulty} </p>

        
            { task.status !== "completed" && <button onClick={ () => onComplete(task.id)}>Complete</button> }
            
            
            <button onClick={() => onDelete(task.id)}> Delete </button>


        </div>

    )


}

export default TaskBox;