import {
  FirstSect,
  FeaturedPro,
  ThirdSect,
  FourthSect,
} from "../components/routes/home";
import "../styles/home/home.css";

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
