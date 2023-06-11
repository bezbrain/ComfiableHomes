import "../styles/register_login.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

const Login = () => {
  const { loginLogout, setLoginLogout } = useGlobalContext();

  return (
    <>
      {!loginLogout && (
        <div className="login-con">
          <h2>Login here</h2>
          <form>
            <input type="email" placeholder="Email" />
            <br />
            <input type="password" placeholder="password" />
            <br />
            <Link to="/" className="login-btn">
              Login
            </Link>
            <p>
              Don't have an account?
              <span onClick={() => setLoginLogout(true)}> register</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
