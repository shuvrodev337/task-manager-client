import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';

const useMyTasks = () => {

    const {user, loading} = useContext(AuthContext)


      const { data: myTasks = [], refetch:refetchMyTasks, isLoading: myTasksLoading } = useQuery({
    queryKey: ["myTasks"],
    enabled :!loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/tasks?email=${user?.email}`);
      return res.data;
    },
  });
    return [myTasks, myTasksLoading, refetchMyTasks]
};

export default useMyTasks;