import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import MyNavLink from "../../components/MayNavLink/MyNavLink";

const Navbar = () => {
  const {
    user,

    logOut,
  } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Log Out Successful!",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Central Nav Buttons
  const centerNavItems = (
    <>
      <MyNavLink to={"/"}>Home</MyNavLink>
      <MyNavLink to={"/create-task"}>Create Task</MyNavLink>
    </>
  );

  const endNavItems = (
    <>
      {user?.email ? (
        <>
          {user?.displayName && (
            <div>
              <p className="text-center">Hello!</p>
              <p> {user?.displayName}</p>
            </div>
          )}
          <NavLink className={""} onClick={handleLogOut}>
            LogOut
          </NavLink>
        </>
      ) : (
        <>
          <MyNavLink to={'/log-in'}>Log In</MyNavLink>
          <MyNavLink to={'/sign-up'}>Sign Up</MyNavLink>

        </>
      )}
    </>
  );

  return (
    <div className="navbar px-6 h-20  mt-4 bg-transparent shadow-lg max-w-screen-2xl mx-auto">
      <div className="navbar-start space-x-2">
        <NavLink to={"/"}>
          <h2 className="text-3xl ">Task Manager</h2>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className={`menu menu-horizontal space-x-6  items-center  `}>
          {centerNavItems}
        </ul>
      </div>
      <div className="navbar-end ">
        <ul
          className={`menu menu-horizontal space-x-6 hidden lg:flex items-center `}
        >
          {endNavItems}
        </ul>

        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-800 text-sky-500 rounded-box w-52 items-center gap-2 z-10"
          >
            {centerNavItems}
            {endNavItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
