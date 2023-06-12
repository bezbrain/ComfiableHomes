import { Link } from "react-router-dom";
import "../styles/register_login.css";
import { useGlobalContext } from "./context";
import { useState } from "react";
import Notification from "./Notification";

const Register = () => {
  const {
    loginRegister,
    setloginRegister,
    setSuccessNoti,
    setFailureNoti,
    registerPopupNoti,
    setRegisterPopupNoti,
    showRegisterNoti,
    setShowRegisterNoti,
    setShowLoginNoti,
  } = useGlobalContext();
  const eachPerson = {
    username: "",
    email: "",
    password: "",
  };
  const [person, setPerson] = useState(eachPerson);
  const { username, email, password } = person;

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setShowRegisterNoti(true);
      setShowLoginNoti(false);
      setFailureNoti(true);
      setSuccessNoti(false);
      setRegisterPopupNoti(true);
      setTimeout(() => {
        setShowRegisterNoti(false);
      }, 3000);
      return;
    }
    console.log(person);
    setPerson(eachPerson);
    setloginRegister(false);
    setShowRegisterNoti(true);
    setShowLoginNoti(false);
    setSuccessNoti(true);
    setFailureNoti(false);
    setRegisterPopupNoti(false);
    setTimeout(() => {
      setShowRegisterNoti(false);
    }, 3000);
  };

  return (
    <>
      {/* Notification popup */}
      {showRegisterNoti && (
        <Notification
          notiText={`${
            registerPopupNoti
              ? "No field should be empty"
              : "Registered! Now Login"
          }`}
        />
      )}
      {loginRegister && (
        <div className="register-con">
          <h2>Register here</h2>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <br />
            <button className="register-btn" onClick={registerHandler}>
              Register
            </button>
            <p>
              Already have an account?
              <span onClick={() => setloginRegister(false)}> sign in</span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
