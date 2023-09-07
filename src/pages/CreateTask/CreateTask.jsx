import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import { enUS } from 'date-fns/locale';
import { useContext, useState } from "react";
// import { FaCalendar } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
const CreateTask = () => {
    const {user} = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState("");
const [axiosSecure] = useAxiosSecure()
  const navigate = useNavigate();

  // hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = (newtask) => {
    newtask.assignedUser = user?.displayName 
      newtask.assignedUserEmail = user?.email 
      newtask.status = 'todo'

      axiosSecure.post("/tasks",newtask)
          .then((res) => {
            if (res.data.insertedId) {
              reset();
              navigate('/my-tasks')
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Task Added",
                showConfirmButton: false,
                timer: 2000,
              });
            
            }
          })
          .catch((error) => {
            // console.log(error.message);
            
          });
  };

  return (
    <>
    
      <Helmet>
        <title>Task Manager | Create Task</title>
      </Helmet>
      <SectionTitle sectionHeading={'Create A Task'}></SectionTitle>
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
                placeholder="Task Title"
                className="input input-bordered"
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="text-red-800 text-sm">
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
                placeholder="Write Task Description"
                {...register("description", { required: true })}
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-800 text-sm">
                  Description of task is required
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-neutral"
                value="Create Task"
              />
            </div>
          </form>
        </div>
      </div>
    </div>

    </>
  );
};

export default CreateTask;

{/* If due date functionality is required  */}
{/* <div className="form-control">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                // placeholder="Task Title"
                // className="input input-bordered"
                {...register("dueDate", { required: true,valueAsDate:true })}
              />
              {errors.dueDate?.type === "required" && (
                <p className="text-red-800 text-sm">
                  Due date of task is required
                </p>
              )}
            </div> */}
{/* Due date functionality ends  */}