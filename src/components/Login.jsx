import "../styles/register_login.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { useState } from "react";
import Notification from "./Notification";

const Login = () => {
  const {
    loginRegister,
    setloginRegister,
    setFailureNoti,
    setSuccessNoti,
    loginPopupNoti,
    setLoginPopupNoti,
    showLoginNoti,
    setShowLoginNoti,
    setShowRegisterNoti,
    setLoginLogoutOverlay,
    setToggleLoginLogout,
    loginLogoutRef,
  } = useGlobalContext();

  const eachPerson = {
    email: "",
    password: "",
  };
  const [person, setPerson] = useState(eachPerson);

  const { email, password } = person;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setShowLoginNoti(true);
      setShowRegisterNoti(false);
      setFailureNoti(true);
      setSuccessNoti(false);
      setLoginPopupNoti(true);
      setTimeout(() => {
        setShowLoginNoti(false);
      }, 3000);
      return;
    }
    console.log(person);
    setPerson(eachPerson);
    setloginRegister(false);
    setToggleLoginLogout(true);
    setFailureNoti(false);
    setLoginPopupNoti(false);
    setSuccessNoti(true);
    setShowRegisterNoti(false);
    setShowLoginNoti(true);

    setTimeout(() => {
      setLoginLogoutOverlay(false);
      setShowLoginNoti(false);
    }, 3000);
  };

  return (
    <>
      {/* Notification popup */}
      {showLoginNoti && (
        <Notification
          notiText={`${
            loginPopupNoti ? "No field should be empty" : "Login successfully"
          }`}
        />
      )}
      {!loginRegister && (
        <div className="login-con">
          <h2>Login here</h2>
          <form>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <br />
            <button className="login-btn" onClick={handleLogin}>
              Login
            </button>
            <p>
              Don't have an account?
              <span onClick={() => setloginRegister(true)}> register</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
