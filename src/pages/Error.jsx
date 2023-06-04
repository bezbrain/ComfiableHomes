import { Link } from "react-router-dom";
import "../styles/error.css";

const Error = () => {
  return (
    <div className="error-page">
      <img
        className="pulse"
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?size=626&ext=jpg&ga=GA1.2.49781342.1685882618&semt=ais"
        alt="error-page"
      />
      <h3>Oops! Page does not exist</h3>
      <Link to="/">
        <button className="explore-btn error-btn">Go Home</button>
      </Link>
      <Link to="/products">
        <button className="go-home-btn error-btn">Explore</button>
      </Link>
    </div>
  );
};

export default Error;
