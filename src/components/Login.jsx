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
      setShowLoginNoti(true);
      setShowRegisterNoti(false);
      setFailureNoti(true);
      setSuccessNoti(false);
      setLoginPopupNoti("error");
      setTimeout(() => {
        setShowLoginNoti(false);
      }, 3000);
      return;
    }
    try {
      // console.log(person);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log(cred.user);

      const userToken = await auth.currentUser.getIdToken();

      sessionStorage.setItem("authToken", userToken); // Store the authentication token in session storage

      setPerson(eachPerson);
      setloginRegister(false);
      setToggleLoginLogout(true);
      setFailureNoti(false);
      setLoginPopupNoti("success");
      setSuccessNoti(true);
      setShowRegisterNoti(false);
      setShowLoginNoti(true);

      setTimeout(() => {
        setLoginLogoutOverlay(false);
        setShowLoginNoti(false);
      }, 3000);
    } catch (error) {
      setShowLoginNoti(true);
      setLoginPopupNoti("firebase-error");
      setFailureNoti(true);
      setSuccessNoti(false);
      const errorMessage = extratingErrorMsg(error.message);
      setFirebaseError(errorMessage);
      setLoginPopupNoti(errorMessage);
      console.log(error.message);
      setTimeout(() => {
        setShowLoginNoti(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Notification popup */}
      {showLoginNoti && (
        <Notification
          notiText={`${
            loginPopupNoti === "error"
              ? "No field should be empty"
              : loginPopupNoti === "success"
              ? "Login successfully"
              : firebaseError
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
