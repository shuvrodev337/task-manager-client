import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TaskCard from "../../components/TaskCard/TaskCard";
import useAllTasks from "../../hooks/useAllTasks";
import TaskRow from "./TaskRow";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTasks = () => {
    const [allTasks, allTasksLoading, refetchAllTasks] = useAllTasks()
    const [axiosSecure] = useAxiosSecure()

    const searchRef = useRef(null)
    const [searchedData, setSearchedData] = useState(null)

const handleSearch=()=>{
    // event.preventDefault()
    const searchText = searchRef.current.value
    // console.log(searchText);
    // setSearchState(searchText)
    axiosSecure.get(`/all-tasks/search?search=${searchText}`)
    .then(res=>{
        // console.log(res.data);
        const searchResult = res.data
        if (searchResult.length > 0) {
            setSearchedData(searchResult)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Found ${searchResult.length} ${searchResult.length > 1 ? 'tasks':'task' } for '${searchText}'`,
                showConfirmButton: false,
                timer: 2000
              })
            
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No Task found for this user!',
                showConfirmButton: false,
                timer: 2000
              })
        }
    })
}

const deleteTask = (id)=>{
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
          axiosSecure
            .delete(`/tasks/delete/${id}`)
            .then((res) => {
              if (res.data.deletedCount > 0) {
                
  
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Task Deleted!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                
                refetchAllTasks()
              }
            });
        }
      });
}
    return (
        <div className="w-full">
        <Helmet>
    <title>Task Manager | Manage Tasks</title>
  </Helmet>
  <SectionTitle sectionHeading={'Manage All Tasks'}></SectionTitle>



  <div className="my-16 text-center w-1/2 md:w-9/12 mx-auto ">
        <div
        //   onSubmit={handleSearch}
          className="flex items-center justify-center gap-4"
        >
          <div className="form-control w-3/5">
            <input
              type="text"
              name="search"
              placeholder="Search Task By User Name..."
              className="input input-info"
              required
              ref={searchRef}
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="btn border-none text-xl  rounded-3xl bg-emerald-400 hover:bg-emerald-500 capitalize uppercase:text-normal"
          >
            <FaSearch></FaSearch>
          </button>
        </div>
      </div>



    <div className="overflow-x-auto">
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>#</th>
          <th>Assigned User Name</th>
          <th>Task</th>
          <th>Task Status</th>
          <th className="text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {
        //   allFeedbacks.map((feedback,index)=> <FeedbackRow key={feedback._id} feedback={feedback} index={index} refetch={refetch}></FeedbackRow>)
        }
        {
         searchedData ? searchedData.map((task,index)=><TaskRow key={task._id} task={task} index={index} deleteTask={deleteTask}></TaskRow>)   :
         allTasks.map((task,index)=><TaskRow key={task._id} task={task} index={index} deleteTask={deleteTask}></TaskRow>) 

        }
        
        
      </tbody>
    </table>
  </div>
    </div>
    );
};

export default ManageTasks;