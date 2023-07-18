import axios from "axios";
import {useContext, useState } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import useTheme from "../../hooks/useTheme";

const TaskCard = ({ task,i, refetchMyTasks }) => {
    const location = useLocation()
    const navigate = useNavigate()

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

  const editTask = (task) => {

    //   console.log(task._id);
    navigate('/edit-task',{state:{data:task}})
  };


  const deleteTask = (task) => {

    Swal.fire({
        title: "Are you sure?",
        text: `You want to delete the task?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Delete!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:3000/tasks/${_id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                
  
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Task Deleted!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                
                refetchMyTasks()
              }
            });
        }
      });

  };


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
  // console.log(theme);
  return (
    <div className={`card rounded-none w-4/5 md:w-full shadow-xl  border border-neutral-600`}>
      {/* ${theme === 'dark'?'bg-gray-800 text-white':'bg-gray-100' */}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>Due Date : {formattedDate}</p>
        <p>Status: {status}</p>
        <p>Assigned to: {assignedUser}</p>
        <div className="absolute top-2 right-4 flex gap-4">
          <div className="tooltip  tooltip-bottom  " data-tip="Edit Task">
            <button
              className={`text-xl ${(disable || status==='completed') && "hidden"}`}
              onClick={()=>editTask(task)}
            >
              <FaEdit></FaEdit>
            </button>
          </div>
          <div className="tooltip  tooltip-bottom  " data-tip="Delete Task">
            <button className="text-xl " onClick={()=>deleteTask(task)}>
              <FaTrash></FaTrash>
            </button>
          </div>
          <div className="tooltip  tooltip-bottom" data-tip="Mark as complete">
            <button
              className={`text-xl ${disable || status==='completed' && "hidden"}`}
              onClick={() => completeTask(task)}
            >
              <FaCheck></FaCheck>
            </button>
          </div>
        </div>
        <div className="absolute -top-4 -left-4 flex gap-4">
          <button className="btn bg-sky-500 btn-circle  ">{i+1}</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
