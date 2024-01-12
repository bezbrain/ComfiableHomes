/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const FirstSect = () => {
  return (
    <>
      <div className="design-your-comfort">
        <article>
          <h2>Design Your Comfort Zone</h2>
          <p>
            Welcome to our online sanctuary where style meets serenity –
            introducing <span className="brand-name">ComfiableHomes</span> Dive
            into a world where you can "Design Your Comfort Zone", curated with
            a harmonious blend of elegance and ease. Discover a collection that
            transcends trends, offering a seamless fusion of design and comfort
            that empowers you to shape your surroundings with a touch of
            personal luxury. Immerse yourself in a shopping experience where
            every click brings you closer to creating a space that reflects your
            unique taste and embraces the essence of coziness.
          </p>
          <Link to="/products">
            <button className="shop-now-btn">SHOP NOW</button>
          </Link>
        </article>
        <section className="design-comfort-img-sect">
          <img
            className="des-comfort-img-one"
            src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg"
            alt="Design Comfort"
          />
          <img
            className="des-comfort-img-two"
            src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg-2.789918645915c8acb36f.jpeg"
            alt="Design Comfort"
          />
        </section>
      </div>
    </>
  );
};

export default FirstSect;
