
const TaskRow = ({task,index, deleteTask}) => {

    return (
        <tr >
                  <th>{index + 1}</th>
                  <td>{task.assignedUser}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
              <td className="text-right">
               <button
               onClick={()=>deleteTask(task._id)}
            //    disabled={disable || feedback.status === 'approved'} 
               className="btn btn-xs btn-warning rounded-full">Delete</button>
              </td>
                </tr>
    );
};

export default TaskRow;