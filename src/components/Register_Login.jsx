import Register from "./Register";
import Login from "./Login";
import { FaTimes } from "react-icons/fa";
import "../styles/register_login.css";
import { useGlobalContext } from "./context";

const Register_Login = () => {
  const { loginLogoutOverlay, setLoginLogoutOverlay } = useGlobalContext();

  return (
    <>
      <main
        className={`${loginLogoutOverlay ? "add-overlay" : "register_login"}`}
      >
        <FaTimes
          className="close-overlay"
          onClick={() => setLoginLogoutOverlay(false)}
        />
        <Register />
        <Login />
      </main>
    </>
  );
};

export default Register_Login;
