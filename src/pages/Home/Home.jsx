// Importing Components
import FirstSect from "./FirstSect";
import FeaturedPro from "./FeaturedPro";
import ThirdSect from "./ThirdSect";
import FourthSect from "./FourthSect";
// Importing Styles
import "../../styles/home.css";
import "../../styles/home2.css";
import Register_Login from "../../components/Register_Login";
// import { useGlobalContext } from "../../components/context";

const Home = () => {
  // const { isLoading } = useGlobalContext();

  return (
    <>
      {/* To Display "Loading" if the homepage has not loaded */}
      {/* {isLoading && (
        <div className="home-loader-con">
          <p>Loading...</p>
        </div>
      )} */}
      <Register_Login />
      <div className="home-page">
        {/* Body Section */}
        <article className="body-section">
          <FirstSect />
          <FeaturedPro />
          <ThirdSect />
          <FourthSect />
        </article>
      </div>
    </>
  );
};

export default Home;
