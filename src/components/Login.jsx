/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import "../styles/register_login.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { useState } from "react";
import Notification from "./Notification";
import { toast } from "react-toastify";
import { loginUser } from "../apis/users";

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
    setIsLogged,
    auth,
    signInWithEmailAndPassword,
    extratingErrorMsg,
  } = useGlobalContext();

  const eachPerson = {
    email: "",
    password: "",
  };
  const [person, setPerson] = useState(eachPerson);

  const { email, password } = person;

  const [firebaseError, setFirebaseError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("No field should be empty");
      return;
    }
    try {
      // const cred = await signInWithEmailAndPassword(auth, email, password);
      // console.log(cred.user);
      // const userToken = await auth.currentUser.getIdToken();
      // sessionStorage.setItem("authToken", userToken); // Store the authentication token in session storage

      const { data } = await loginUser(person);
      toast.success(data.message);
      setIsLogged("Logout");
      const userToken = data.token;
      sessionStorage.setItem("authToken", userToken); // Store the authentication token in session storage
      setPerson(eachPerson);
      setloginRegister(false);

      setTimeout(() => {
        setLoginLogoutOverlay(false);
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
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
