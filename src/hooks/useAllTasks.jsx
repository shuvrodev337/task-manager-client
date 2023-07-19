import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAllTasks = () => {
    const [axiosSecure] = useAxiosSecure()

    const {user, loading} = useContext(AuthContext)


      const { data: allTasks = [], refetch:refetchAllTasks, isLoading: allTasksLoading } = useQuery({
    queryKey: ["allTasks"],
    enabled :!loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks`);
      return res.data;
    },
  });
    return [allTasks, allTasksLoading, refetchAllTasks]
};

export default useAllTasks;