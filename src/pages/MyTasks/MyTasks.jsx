import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import TaskCard from "../../components/TaskCard/TaskCard";
import useMyTasks from "../../hooks/useMyTasks";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaRegSadTear } from "react-icons/fa";
import Section from "../../components/Section/Section";
import MyNavLink from "../../components/MayNavLink/MyNavLink";

const MyTasks = () => {

  const { user } = useContext(AuthContext);
  const [myTasks, myTasksLoading, refetchMyTasks] = useMyTasks();

  const statuses = ["todo", "doing", "done"];
  return (
    <div className="mx-auto max-w-screen-lg">
      <Helmet>
        <title>Task Manager | My Tasks</title>
      </Helmet>
      <SectionTitle sectionHeading={"My Tasks"}></SectionTitle>
{/* <div className="flex items-center justify-center my-6">
<Link to={"/create-task"} className="btn btn-neutral">
            Add Task
          </Link>
</div> */}
      {(!myTasksLoading && myTasks.length < 1) || !user ? (
        <div className="flex flex-col items-center md:items-center justify-center">
          <p className="mb-2 font-medium text-xl flex items-center gap-2">You have no Task <FaRegSadTear /></p>
          <MyNavLink  to={"/create-task"}><span className="underline underline-offset-4 ">Create Task</span></MyNavLink>

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
    </div>
  );
};

export default MyTasks;








