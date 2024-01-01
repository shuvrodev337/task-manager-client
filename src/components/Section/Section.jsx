import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useDrop } from 'react-dnd';
import Swal from 'sweetalert2';
import TaskCard from '../TaskCard/TaskCard';

const Section = ({ status, myTasks,refetchMyTasks}) => {
    const [axiosSecure] = useAxiosSecure();
  
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
  
    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop:(item)=>addItemToSection(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }))
  
  // ----------------------Updating Tasks --------------------------
    const addItemToSection =(id)=>{
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
  //             title: `Task status updated as "${status}"`,
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //         }
  //       });
  //     }
  //   });
  // };
  // upDateTask(id)

  axiosSecure.patch(`/tasks/${status}/${id}`).then((res) => {
    if (res.data.modifiedCount > 0) {
      refetchMyTasks();
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: `Task status: ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
    }
    //-------------------------------------------------------------------
    return (
      <div ref={drop} className={`h-screen w-64 ${isOver ?'bg-slate-100':''}`}>
        <Header text={text} bg={bg} count={tasksToMap.length}></Header> 
        <div className="divider w-9/12 mx-auto"></div>
  
       <div className="flex flex-col gap-4 my-5">
       {
          tasksToMap.map((task,i)=><TaskCard task={task} key={task._id} refetchMyTasks={refetchMyTasks} i={i}></TaskCard>)
        }
       </div>
      </div>
    );
  };

export default Section;

const Header = ({ text, bg, count }) => {
    return (
      <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
        {text} 
        <div className="ml-2  w-6 h-6 bg-white text-black rounded-full flex items-center justify-center">{count}</div>
      </div>
    );
  };