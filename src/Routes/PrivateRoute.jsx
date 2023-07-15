import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user , loading}= useContext(AuthContext)
    if (loading) {
        return <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }

    if (user) {
        return children
    }
    return <Navigate to={'/log-in'} state={{from:location}} replace></Navigate>
};

export default PrivateRoute;