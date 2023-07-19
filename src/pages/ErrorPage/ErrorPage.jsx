import { Link } from "react-router-dom";
import errorImage from "../../assets/97881-error-404.json"
// import { Lottie } from "lottie-react";
// import Lottie from "lottie-react";
import Lottie from "lottie-react";

const ErrorPage = () => {
    return (
        <div>
      <div className="w-3/5 mx-auto">
        <Lottie
        
          
          animationData={errorImage}
          loop={true}
        />
      </div>
      <div className="text-center my-5">
        <Link
          to={"/"}
          className="btn btn-neutral md:btn-wide  capitalize uppercase:text-normal"
        >
          Back to Home
        </Link>
      </div>
    </div>
    );
};

export default ErrorPage;