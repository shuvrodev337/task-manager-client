import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useAllUsers = () => {
    const [axiosSecure] = useAxiosSecure()

    const {user, loading} = useContext(AuthContext)


      const { data: allUsers = [], refetch:refetchAllUsers, isLoading: allUsersLoading } = useQuery({
    queryKey: ["allUsers"],
    enabled :!loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
    return [allUsers, allUsersLoading, refetchAllUsers]
};

export default useAllUsers;