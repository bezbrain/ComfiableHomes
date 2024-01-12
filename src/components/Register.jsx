/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "../styles/register_login.css";
import { useGlobalContext } from "../contexts/context";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../apis/users";

const Register = () => {
  const { loginRegister, setloginRegister } = useGlobalContext();

  const eachPerson = {
    username: "",
    email: "",
    password: "",
  };
  const [person, setPerson] = useState(eachPerson);
  const { username, email, password } = person;
  const [isLoading, setIsLoading] = useState(false);

  // const [firebaseError, setFirebaseError] = useState("");

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
      toast.error("No field should be empty");
      return;
    }
    try {
      // console.log(person);
      // const cred = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(cred.user);
      setIsLoading(true);
      const { data } = await registerUser(person);
      toast.success(data.message);
      setPerson(eachPerson);
      setloginRegister(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
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
            <button
              className={`${isLoading ? "add-disable" : ""} register-btn`}
              onClick={registerHandler}
            >
              {isLoading ? "Loading..." : "Register"}
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
