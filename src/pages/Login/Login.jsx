import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogins from "../../components/SocialLogins/SocialLogins";
import Swal from "sweetalert2";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
const location = useLocation()
  const [errorMsg,setErrorMsg] = useState('')

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const from = location.state?.from?.pathname || "/";
  // console.log(from);
  // if (from === '/create-task') {
  //   Swal.fire({
  //     position: "center",
  //     icon: "warning",
  //     title: "You have to log in first",
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });
  // }
 const { user,
    loading,
    createUser, 
    signIn,
    googleSignIn,
    updateUserProfile,
    passwordReset, 
    logOut } = useContext(AuthContext)

  const onSubmit = user=>{
// console.log(user);
signIn(user.email, user.password)
    .then((result) => {
      const loggedUser = result.user;
      // console.log(loggedUser);
      navigate(from,{replace:true});
    })
    .catch((error) => {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setErrorMsg("The email address you have entered is not registered!");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setErrorMsg("Password Incorrect! Type again or reset.");
      }
    });

  }

    return (
    <>
    <Helmet>
        <title>Task Manager | Login</title>
      </Helmet>
      <SectionTitle sectionHeading={'Log In Here!'}></SectionTitle>
      <div className="md:w-1/2 mx-auto">
      <div className="hero-content flex-col gap-10">
        
        <div className="card  w-full  shadow-2xl bg-base-100 ">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered"
                {...register("email", { required: true })} 

              />
              {errors.email?.type === "required" && (
                <p className="text-red-800 text-sm">Email is required</p>
              )}
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="flex items-center ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full"
                {...register("password")}

              />
              <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-link btn-xs absolute right-10"
                >
                  {showPassword ? <FaEyeSlash className="text-2xl text-gray-500"></FaEyeSlash >:<FaEye className="text-2xl text-gray-500"></FaEye>}
                </button>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-800 text-sm">Password is required</p>
              )}
              
            </div>
            
            <p className="text-red-800 text-sm">{errorMsg}</p>
           
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-neutral"
                value="Log In"
              />
            </div>
          </form>
          <p className="text-center">New Here? <Link className="btn btn-ghost btn-sm underline mb-4" to={'/sign-up'}>Sign Up!</Link></p>

  <SocialLogins></SocialLogins>
        </div>
      </div>
    </div>
    
    
    </>
    );
};

export default Login;