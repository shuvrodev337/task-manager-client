
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TaskCard from "../../components/TaskCard/TaskCard";
import useMyTasks from "../../hooks/useMyTasks";


const MyTasks = () => {

 const [myTasks, myTasksLoading, refetchMyTasks] = useMyTasks()
    return (
        <div className="mx-auto max-w-screen-lg">
            <SectionTitle sectionHeading={'My Tasks'}></SectionTitle>
            <div className="flex flex-col items-center  gap-4 ">
            {
             myTasks.map(task=><TaskCard key={task._id} task={task} refetchMyTasks={refetchMyTasks}></TaskCard>)
            }
        </div>
        </div>
    );
    
};

export default MyTasks;