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
    auth,
    createUserWithEmailAndPassword,
    extratingErrorMsg,
  } = useGlobalContext();

  const eachPerson = {
    username: "",
    email: "",
    password: "",
  };
  const [person, setPerson] = useState(eachPerson);
  const { username, email, password } = person;

  const [firebaseError, setFirebaseError] = useState("");

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setShowRegisterNoti(true);
      setShowLoginNoti(false);
      setFailureNoti(true);
      setSuccessNoti(false);
      setRegisterPopupNoti("error");
      setTimeout(() => {
        setShowRegisterNoti(false);
      }, 3000);
      return;
    }
    try {
      // console.log(person);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      console.log(cred.user);
      setPerson(eachPerson);
      setloginRegister(false);
      setShowRegisterNoti(true);
      setShowLoginNoti(false);
      setSuccessNoti(true);
      setFailureNoti(false);
      setRegisterPopupNoti("success");
      setTimeout(() => {
        setShowRegisterNoti(false);
      }, 3000);
    } catch (error) {
      setShowRegisterNoti(true);
      setRegisterPopupNoti("firebase-error");
      setFailureNoti(true);
      const errorMessage = extratingErrorMsg(error.message);
      setFirebaseError(errorMessage);
      setRegisterPopupNoti(errorMessage);
      console.log(error.message);
      setTimeout(() => {
        setShowRegisterNoti(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Notification popup */}
      {showRegisterNoti && (
        <Notification
          notiText={`${
            registerPopupNoti === "error"
              ? "No field should be empty"
              : registerPopupNoti === "success"
              ? "Registered! Now Login"
              : firebaseError
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
