import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useMyTasks = () => {
const [axiosSecure] = useAxiosSecure()
    const {user, loading} = useContext(AuthContext)


      const { data: myTasks = [], refetch:refetchMyTasks, isLoading: myTasksLoading } = useQuery({
    queryKey: ["myTasks"],
    enabled :!loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/tasks?email=${user?.email}`);
      return res.data;
    },
  });
    return [myTasks, myTasksLoading, refetchMyTasks]
};

export default useMyTasks;