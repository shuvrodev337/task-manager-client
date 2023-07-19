
import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FaHome,FaTools,FaToolbox, FaBook, FaPlusSquare, FaWallet , FaUser, FaUserNinja, FaUserShield, FaBookOpen} from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import { AuthContext } from "../../Providers/AuthProvider";


const Dashboard = () => {
  const user = useContext(AuthContext)

  const [isAdmin] = useAdmin()
  return (
    <>
    <Helmet>
        <title>Task Manager | Dashboard</title>
      </Helmet>

    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-info drawer-button lg:hidden my-6"
        >
          Open Sidebar
        </label>
      </div>
      <div className="drawer-side">
          {/* <Fade direction="left"> */}
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-gray-900 text-sky-500">
          {/* Sidebar content here */}
         

          { (user && isAdmin ) &&  <>
          {/* <li>
            <NavLink  to={"/dashboard"}>
              <FaUserShield></FaUserShield>
              Admin Home</NavLink>
          </li> */}
          {/* <li>
            
            <NavLink to={"/dashboard/manage-users"}>
            <FaUser></FaUser>
              Manage Users</NavLink>
          </li> */}
          <li>
            
            <NavLink  to={"/dashboard"}>
            <FaTools></FaTools>
              Manage Tasks</NavLink>
          </li>
          
        </>}

          <li>
            <NavLink to={"/"}>
              <FaHome></FaHome>
              Home</NavLink>
          </li>
        </ul>
      </div>
    </div>

    </>
  );
};

export default Dashboard;
