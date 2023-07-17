import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task }) => {
    const {
      _id,
      title,
      description,
      dueDate,
      assignedUser,
      status,
      assignedUserEmail,
    } = task;
   
  
    // Convert the date format
    const date = new Date(dueDate);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    const editTask = (task)=>{
        
    }
    const deletetask = (task)=>{

    }
    const completeTask = (task)=>{

    }
    return (
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p>Due Date : {formattedDate}</p>
          <p>Status: {status}</p>
          <p>Assigned to: {assignedUser}</p>
          <div className="tooltip  tooltip-bottom absolute top-2 right-12 " data-tip='Edit Task'>
            <button className="text-xl " onClick={editTask}><FaEdit></FaEdit></button>
          </div>
          <div className="tooltip  tooltip-bottom absolute top-2 right-20 " data-tip='Delete Task'>
          <button className="text-xl " onClick={deletetask}><FaTrash></FaTrash></button>
          </div>
          <div className="tooltip  tooltip-bottom absolute top-2 right-4 " data-tip='Complete Task'>
            <button className="text-xl " onClick={completeTask}><FaCheck></FaCheck></button>
          </div>
        </div>
      </div>
    );
  };
  
  export default TaskCard;