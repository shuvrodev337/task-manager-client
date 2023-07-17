import axios from "axios";
import { useState } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const TaskCard = ({ task, refetchMyTasks }) => {
  const {
    _id,
    title,
    description,
    dueDate,
    assignedUser,
    status,
    assignedUserEmail,
  } = task;

  const [disable, setDisable] = useState(false);
  // Convert the date format
  const date = new Date(dueDate);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;

  const editTask = (task) => {};
  const deletetask = (task) => {};
  const completeTask = (task) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to mark this task as 'completed'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do It!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:3000/tasks/completed/${task._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setDisable(true);
              refetchMyTasks();

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task marked as completed!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>Due Date : {formattedDate}</p>
        <p>Status: {status}</p>
        <p>Assigned to: {assignedUser}</p>
        {/* <div className="tooltip  tooltip-bottom absolute top-2 right-12 " data-tip='Edit Task'>
            <button className={`text-xl ${disable && 'hidden'}`} onClick={editTask}><FaEdit></FaEdit></button>
          </div>
          <div className="tooltip  tooltip-bottom absolute top-2 right-20 " data-tip='Delete Task'>
          <button className="text-xl " onClick={deletetask}><FaTrash></FaTrash></button>
          </div>
          <div className="tooltip  tooltip-bottom absolute top-2 right-4 " data-tip='Complete Task'>
            <button  className={`text-xl ${disable && 'hidden'}`} onClick={()=>completeTask(task)}><FaCheck></FaCheck></button>
          </div> */}
        <div className="absolute top-2 right-4 flex gap-4">
          <div className="tooltip  tooltip-bottom  " data-tip="Edit Task">
            <button
              className={`text-xl ${disable && "hidden"}`}
              onClick={editTask}
            >
              <FaEdit></FaEdit>
            </button>
          </div>
          <div className="tooltip  tooltip-bottom  " data-tip="Delete Task">
            <button className="text-xl " onClick={deletetask}>
              <FaTrash></FaTrash>
            </button>
          </div>
          <div className="tooltip  tooltip-bottom" data-tip="Complete Task">
            <button
              className={`text-xl ${disable && "hidden"}`}
              onClick={() => completeTask(task)}
            >
              <FaCheck></FaCheck>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
