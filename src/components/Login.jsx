/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import "../styles/register_login.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../contexts/context";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../apis/users";
import { getCartProducts } from "../apis/products";
import { useApiContext } from "../contexts/apiContext";

const Login = () => {
  const {
    loginRegister,
    setloginRegister,
    setLoginLogoutOverlay,
    setIsLogged,
    quantityOfProductInCart,
  } = useGlobalContext();

  const { getCartProduct, setCartCount, setGetCartProduct } = useApiContext();

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const { data } = await loginUser(person);
      toast.success(data.message);
      setIsLogged("Logout");
      const userToken = data.token;
      sessionStorage.setItem("authToken", userToken); // Store the authentication token in session storage
      setPerson(eachPerson);
      setIsLoading(false);
      setloginRegister(false);

      setLoginLogoutOverlay(false);

      // Call the get all cart items endpoint to make sure number of items in cart is readily available on login
      const { items } = await getCartProducts();
      setGetCartProduct(items);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message || error.message);
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
            <button
              className={`${isLoading ? "add-disable" : ""} login-btn`}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
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
