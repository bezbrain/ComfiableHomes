import { Link } from "react-router-dom";
import "../styles/register_login.css";
import { useGlobalContext } from "./context";

const Register = () => {
  const { loginLogout, setLoginLogout } = useGlobalContext();

  return (
    <>
      {loginLogout && (
        <div className="register-con">
          <h2>Register here</h2>
          <form>
            <input type="text" placeholder="Username" />
            <br />
            <input type="email" placeholder="Email" />
            <br />
            <input type="password" placeholder="password" />
            <br />
            <Link to="/" className="register-btn">
              Register
            </Link>
            <p>
              Already have an account?
              <span onClick={() => setLoginLogout(false)}> sign in</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
