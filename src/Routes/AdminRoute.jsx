import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
// import useAdmin from "../hooks/useAdmin";
// import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {
    const location = useLocation()
    const [isAdmin,isAdminLoading] =  useAdmin()
    const {user , loading}= useContext(AuthContext)
    
    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to={'/'} state={{from:location}} replace></Navigate>
};

export default AdminRoute;