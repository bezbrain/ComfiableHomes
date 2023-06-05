// Importing Components
import FirstSect from "./FirstSect";
import FeaturedPro from "./FeaturedPro";
import ThirdSect from "./ThirdSect";
import FourthSect from "./FourthSect";
// Importing Styles
import "../../styles/home.css";
import "../../styles/home2.css";

const Home = () => {
  return (
    <>
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
