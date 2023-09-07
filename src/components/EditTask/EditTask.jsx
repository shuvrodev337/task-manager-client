import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { useContext, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../SectionTitle/SectionTitle";

const EditTask = () => {
const [axiosSecure]= useAxiosSecure()

  const location = useLocation();
  const navigate = useNavigate()

  const { data: task } = location.state || {};

  const {
    _id,
    title,
    description,
    assignedUser,
    status,
    assignedUserEmail,
  } = task;

  // hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit=(updatedTask)=>{
updatedTask.assignedUser = assignedUser
updatedTask.status = status
updatedTask.assignedUserEmail = assignedUserEmail
    Swal.fire({
        title: "Are you sure?",
        text: `You want to update the task?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Do It!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .put(`/tasks/update/${_id}`, updatedTask)
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                
  
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Task Updated!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset()
                navigate('/my-tasks')
              }
            });
        }
      });
}
return <>
    <Helmet>
        <title>Task Manager | Edit Task</title>
      </Helmet>
<SectionTitle sectionHeading={'Edit Task'}></SectionTitle>
  <div className="md:w-1/2 mx-auto">
      <div className="hero-content flex-col gap-10">
        <div className="card  w-full  shadow-2xl bg-base-100 ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                defaultValue={title}
                className="input input-bordered"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-red-800 text-sm my-2">
                  Title of task is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>

              <textarea
                className="textarea textarea-info"
                defaultValue={description}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-800 text-sm my-2">
                  Description of task is required
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-neutral"
                value="Update Task"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>;
};

export default EditTask;

{/* <div className="form-control">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                // placeholder="Task Title"
                // className="input input-bordered"
                // defaultValue={dueDate}
                {...register("dueDate", { required: true,valueAsDate:true })}
              />
              {errors.dueDate?.type === "required" && (
                <p className="text-red-800 text-sm my-2">
                  Due date of task is required
                </p>
              )}
            </div> */}