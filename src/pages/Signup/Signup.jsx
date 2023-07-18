import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialLogins from "../../components/SocialLogins/SocialLogins";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    passwordReset,
    logOut,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    // Password Validation
    if (user.password !== user.confirmPassword) {
      setErrorMsg("Password did not match");
      return;
    } else {
      setErrorMsg("");
    }

    createUser(user.email, user.password)
      .then(() => {
        updateUserProfile(user.name).then(() => {
          const savedUser = {
            name: user.name,
            email: user.email,
          };
          axios.post("http://localhost:3000/users", savedUser).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Sign Up Successful! PLease Login Now",
                showConfirmButton: false,
                timer: 2000,
              });
              logOut().then(() => {
                navigate("/log-in");
              });
            }
          });
        });
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            setErrorMsg(
              "The email address you have entered is already registered!"
            );
          }
      });
  };

  return (
    <>
      <Helmet>
        <title>Task Manager | Sign Up</title>
      </Helmet>

      <div className="md:w-1/2 mx-auto">
        <div className="hero-content flex-col gap-10">
          <div className="card  w-full  shadow-2xl bg-base-100 ">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-800 text-sm">First name is required</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-800 text-sm">Email is required</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Create Password</span>
                </label>
                <div className="flex items-center">
                <input
                 type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
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
                {errors.password?.type === "minLength" && (
                  <p className="text-red-800 text-sm">Password Too short</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="input input-bordered w-full"
                  {...register("confirmPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-link btn-xs absolute right-10"
                >
                  {showPassword ? <FaEyeSlash className="text-2xl text-gray-500"></FaEyeSlash >:<FaEye className="text-2xl text-gray-500"></FaEye>}
                </button>
                </div>
              </div>
              <p className="text-red-800">{errorMsg}</p>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  className="btn btn-neutral"
                  value="Sign Up"
                />
              </div>
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link
                className="btn btn-ghost btn-sm underline mb-4"
                to={"/log-in"}
              >
                Log In Here!
              </Link>
            </p>
            <SocialLogins></SocialLogins>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
