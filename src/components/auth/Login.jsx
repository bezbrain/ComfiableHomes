/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import "../../styles/auth/register_login.css";
import { useGlobalContext } from "../../contexts/context";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../apis/users";
import { getCartProducts } from "../../apis/cart";
import { useApiContext } from "../../contexts/apiContext";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const {
    loginRegister,
    setloginRegister,
    setLoginLogoutOverlay,
    setIsLogged,
  } = useGlobalContext();

  const { setGetCartProduct } = useApiContext();

  const [isLoading, setIsLoading] = useState(false);

  const eachPerson = {
    email: "",
    password: "",
  };
  const [person, setPerson] = useState(eachPerson);

  const { email, password } = person;

  // const [firebaseError, setFirebaseError] = useState("");

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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const portfolioEmail = searchParams.get("portfolioEmail");
    const portfolioPassword = searchParams.get("portfolioPassword");
    if (portfolioEmail && portfolioPassword) {
      setPerson({
        ...person,
        email: portfolioEmail,
        password: portfolioPassword,
      });
    }
  }, [searchParams]);

  return (
    <Suspense
      fallback={
        <div className="loading-container">
          <div className="loading-content">
            <div className="spinner"></div>
            <p className="loading-text">Loading...</p>
          </div>
        </div>
      }
    >
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
    </Suspense>
  );
};

export default Login;
