import { useState } from "react";
import "../../../styles/home/fourthSection.css";

const FourthSect = () => {
  const [btnValue] = useState("Subscribe");

  return (
    <>
      <div className="fourth-sect-bg">
        <div className="fourth-body-con">
          <h3>Join our newsletter and get 20% off</h3>
          <section className="newsletter-input">
            <p>
              Embark on a journey to elevate your comfort and style. Explore our
              curated collection at ComfiableHomes and transform your living
              spaces into havens of personal luxury.
            </p>
            <div className="newletter-email">
              <input type="text" placeholder="Enter Email" />
              <input type="submit" value={btnValue} />
              {/* <button className="sub-btn">Subscribe</button> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FourthSect;
