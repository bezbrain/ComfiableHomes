import {
  FirstSect,
  FeaturedPro,
  ThirdSect,
  FourthSect,
} from "../components/routes/home";
import "../styles/home.css";
import "../styles/home2.css";

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
