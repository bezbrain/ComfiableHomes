import { Login, Register } from "./";
import { FaTimes } from "react-icons/fa";
import "../../styles/auth/register_login.css";
import { useGlobalContext } from "../../contexts/context";

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
