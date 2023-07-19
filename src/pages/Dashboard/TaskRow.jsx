
const TaskRow = ({task,index}) => {

    return (
        <tr >
                  <th>{index + 1}</th>
                  <td>{task.assignedUser}</td>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
              <td className="text-right">
               <button
            //    onClick={()=>approveFeedback(feedback)}
            //    disabled={disable || feedback.status === 'approved'} 
               className="btn btn-xs btn-info rounded-full">Approve</button>
              </td>
                </tr>
    );
};

export default TaskRow;