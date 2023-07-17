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
const CreateTask = () => {
    const {user} = useContext(AuthContext)
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // day picker

//   const [selected, setSelected] = useState();

//   let footer = <p>Please pick a day.</p>;
//   if (selected) {
//     footer = <p>You picked {format(selected, "PP")}.</p>;
//   }
  // console.log(selected);

  //Modal
//   const [isOpen, setIsOpen] = useState(false);
//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

  // Get all Users

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],

//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/users`);
//       return res.data;
//     },
//   });
  // console.log(users);
//   const [selectedUser, setSelectedUser] = useState(null);

  const onSubmit = (newtask) => {
    newtask.assignedUser = user?.displayName 
      newtask.assignedUserEmail = user?.email 
      newtask.status = 'pending'
      console.log(newtask);

    axios.post("http://localhost:3000/tasks",newtask)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              reset();
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
            console.log(error.message);
            
          });
  };

  return (
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

            {/* select user */}
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Assign User</span>
              </label>
              <select
                // defaultValue={selectedUser}
                // onChange={(e) => setSelectedUser(e.target.value)}
                className="drop-down dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                {...register("assignedUser", { required: true })}
              >
                <option value="Select" disabled>
                  Users
                </option>

                {users.map((user) => (
                  <option key={user._id} value={user?.name}>
                    {user?.name}
                  </option>
                ))}
              </select>

              {errors.name?.type === "required" && (
                <p className="text-red-800 text-sm">
                  Description of task is required
                </p>
              )}
            </div> */}
            {/* Select due date  */}

<div className="form-control">
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
  );
};

export default CreateTask;

// Tasks should have a title, description, due date, status, and assigned user (automatically showcase all users in this dropdown field)
