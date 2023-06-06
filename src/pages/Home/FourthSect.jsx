import { useState } from "react";

const FourthSect = () => {
  const [btnValue] = useState("Subscribe");

  return (
    <>
      <div className="fourth-sect-bg">
        <div className="fourth-body-con">
          <h3>Join our newsletter and get 20% off</h3>
          <section className="newsletter-input">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel,
              nulla! Quo officiis, architecto expedita, officia ducimus sapiente
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
