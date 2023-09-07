import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import TaskCard from "../../components/TaskCard/TaskCard";
import useMyTasks from "../../hooks/useMyTasks";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useDrop } from "react-dnd";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import Section from "../../components/Section/Section";

const MyTasks = () => {

  const { user } = useContext(AuthContext);
  const [myTasks, myTasksLoading, refetchMyTasks] = useMyTasks();
// console.log(theme);

  const statuses = ["todo", "doing", "done"];
  return (
    <div className="mx-auto max-w-screen-lg">
      <Helmet>
        <title>Task Manager | My Tasks</title>
      </Helmet>
      <SectionTitle sectionHeading={"My Tasks"}></SectionTitle>
<div className="flex items-center justify-center my-6">
<Link to={"/create-task"} className="btn btn-neutral">
            Add Task
          </Link>
</div>
      {(!myTasksLoading && myTasks.length < 1) || !user ? (
        <div className="flex flex-col items-center md:items-center justify-center">
          {/* <SectionTitle sectionSubHeading={'No Tasks added.'}></SectionTitle> */}
          <p className="mb-2 font-medium text-xl">You have no Tasks added.</p>
          {/* <Link to={"/create-task"} className="btn btn-info">
            Add Task
          </Link> */}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-16 items-center md:items-baseline justify-center">
          {statuses.map((status, index) => (
            <Section
              key={index}
              status={status}
             myTasks={myTasks}
             refetchMyTasks={refetchMyTasks}
            ></Section>
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default MyTasks;

// const Section = ({ status, myTasks,refetchMyTasks}) => {
//   const [axiosSecure] = useAxiosSecure();

//   let text = "TO DO";
//   let bg = "bg-slate-500";
//   let tasksToMap = myTasks.filter(task => task.status === 'todo')

//   if (status === 'doing') {
//     text = 'DOING'
//     bg = "bg-cyan-500"
//     tasksToMap = myTasks.filter(task => task.status === 'doing')
//   }
//   if (status === 'done') {
//     text = 'DONE'
//     bg = "bg-green-500"
//     tasksToMap = myTasks.filter(task => task.status === 'done')
//   }

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "task",
//     drop:(item)=>addItemToSection(item.id),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver()
//     })
//   }))

// // ----------------------Updating Tasks --------------------------
//   const addItemToSection =(id)=>{
// console.log('dropped', id, status);

// const upDateTask = (id) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: `Change the status of task as "${status}"?`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, Do It!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       axiosSecure.patch(`/tasks/${status}/${id}`).then((res) => {
//         if (res.data.modifiedCount > 0) {
//           refetchMyTasks();
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: `Task marked as "${status}"`,
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         }
//       });
//     }
//   });
// };
// upDateTask(id)
//   }
//   //-------------------------------------------------------------------
//   return (
//     <div ref={drop} className={`w-64 ${isOver ?'bg-slate-100':''}`}>
//       <Header text={text} bg={bg} count={tasksToMap.length}></Header> 
//       <div className="divider w-9/12 mx-auto"></div>

//      <div className="flex flex-col gap-4 my-5">
//      {
//         tasksToMap.map((task,i)=><TaskCard task={task} key={task._id} refetchMyTasks={refetchMyTasks} i={i}></TaskCard>)
//       }
//      </div>
//     </div>
//   );
// };
// const Header = ({ text, bg, count }) => {
//   return (
//     <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
//       {text} 
//       <div className="ml-2  w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">{count}</div>
//     </div>
//   );
// };





// myTasks.map((task, i) => (
//   <TaskCard
//     key={task._id}
//     task={task}
//     i={i}
//     refetchMyTasks={refetchMyTasks}
//   ></TaskCard>
// ))
// myTasks.filter((task)=>task.status === 'todo').map((task, i) => (
//   <TaskCard
//     key={task._id}
//     task={task}
//     i={i}
//     refetchMyTasks={refetchMyTasks}
//   ></TaskCard>
// ))
