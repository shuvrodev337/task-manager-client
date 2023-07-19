
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TaskCard from "../../components/TaskCard/TaskCard";
import useMyTasks from "../../hooks/useMyTasks";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";


const MyTasks = () => {
const {user} = useContext(AuthContext)
 const [myTasks, myTasksLoading, refetchMyTasks] = useMyTasks()
    return (
        <div className="mx-auto max-w-screen-lg">
            <Helmet>
        <title>Task Manager | My Tasks</title>
      </Helmet>
            <SectionTitle sectionHeading={'My Tasks'}></SectionTitle>
            
            <div className="flex flex-col items-center  gap-10 ">
            {
             (!myTasksLoading &&   myTasks.length <1 ) || !user? 
            <>
            {/* <SectionTitle sectionSubHeading={'No Tasks added.'}></SectionTitle> */}
            <p className="mb-2 font-medium text-xl">You have no Tasks added.</p>
            <Link to={'/create-task'} className="btn btn-info">Add Task</Link>
            </>
                
                :
             myTasks.map((task,i)=><TaskCard key={task._id} task={task} i={i} refetchMyTasks={refetchMyTasks}></TaskCard>)
            }
        </div>
        </div>
    );
    
};

export default MyTasks;