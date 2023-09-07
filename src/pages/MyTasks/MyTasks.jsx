import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TaskCard from "../../components/TaskCard/TaskCard";
import useMyTasks from "../../hooks/useMyTasks";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [myTasks, myTasksLoading, refetchMyTasks] = useMyTasks();
  // const [todos, setTodos] = useState([]);
  // const [inProgress, setInProgress] = useState([]);
  // const [done, setDone] = useState([]);

  // useEffect(() => {
  //   const filteredTodos = myTasks.filter((task) => task.status === "todo");
  //   const filteredInProgress = myTasks.filter(
  //     (task) => task.status === "doing"
  //   );
  //   const filteredDone = myTasks.filter((task) => task.status === "done");
  //   setTodos(filteredTodos);
  //   setInProgress(filteredInProgress);
  //   setDone(filteredDone);
  // }, [myTasks]);


  const statuses = ["todo", "doing", "done"];
  return (
    <div className="mx-auto max-w-screen-lg">
      <Helmet>
        <title>Task Manager | My Tasks</title>
      </Helmet>
      <SectionTitle sectionHeading={"My Tasks"}></SectionTitle>

      {/* <div className="flex flex-col items-center  gap-10 "> */}
      {(!myTasksLoading && myTasks.length < 1) || !user ? (
        <>
          {/* <SectionTitle sectionSubHeading={'No Tasks added.'}></SectionTitle> */}
          <p className="mb-2 font-medium text-xl">You have no Tasks added.</p>
          <Link to={"/create-task"} className="btn btn-info">
            Add Task
          </Link>
        </>
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

const Section = ({ status, myTasks,refetchMyTasks}) => {
  let text = "TO DO";
  let bg = "bg-slate-500";
  let tasksToMap = myTasks.filter(task => task.status === 'todo')

  if (status === 'doing') {
    text = 'DOING'
    bg = "bg-cyan-500"
    tasksToMap = myTasks.filter(task => task.status === 'doing')
  }
  if (status === 'done') {
    text = 'DONE'
    bg = "bg-green-500"
    tasksToMap = myTasks.filter(task => task.status === 'done')
  }
  return (
    <div className={`w-64`}>
      <Header text={text} bg={bg} count={tasksToMap.length}></Header> 
     <div className="flex flex-col gap-4 my-5">
     {
        tasksToMap.map((task,i)=><TaskCard task={task} key={task._id} refetchMyTasks={refetchMyTasks} i={i}></TaskCard>)
      }
     </div>
    </div>
  );
};
const Header = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
      {text} 
      <div className="ml-2  w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">{count}</div>
    </div>
  );
};





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
