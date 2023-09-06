import { Helmet } from "react-helmet-async";
import MyTasks from "../MyTasks/MyTasks";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Task Manager | Home</title>
      </Helmet>
      <MyTasks></MyTasks>
    </div>
  );
};

export default Home;
