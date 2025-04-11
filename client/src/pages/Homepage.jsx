import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div>
      <div>
        <h1>Welcome to homepage</h1>
        <Link to="/register" className="">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
