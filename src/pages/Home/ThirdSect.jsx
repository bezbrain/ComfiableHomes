/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";

const ThirdSect = () => {
  const [isMission, setIsMission] = useState(false);
  const [isVision, setIsVision] = useState(false);

  return (
    <>
      <div className="add-bg-third-sect-con">
        <div className="third-sect-con">
          <section className="top-sect">
            <h2>Custom Furniture Built Only For You</h2>
            <p>
              We take pride in crafting bespoke pieces that transcend the
              ordinary. Our commitment to excellence is reflected in every
              detail, as we believe in the art of creating 'Custom Furniture
              Built Only For You.'
            </p>
          </section>
          <article className="all-boxes">
            <div className="misson-con about">
              <div className="logo"></div>
              <h3>Mission</h3>
              <p>
                At ComfiableHomes, our mission is to inspire and empower
                individuals to elevate their living spaces with comfort and
                style. We strive to curate a diverse collection of high-quality
                products that seamlessly blend form and function, enabling our
                customers to design their...{" "}
                {!isMission && (
                  <i className="read-more" onClick={() => setIsMission(true)}>
                    read more
                  </i>
                )}
                {isMission && (
                  <>
                    <span>
                      ideal comfort zones. With a commitment to exceptional
                      customer service and a passion for delivering unparalleled
                      shopping experiences, we aim to be the go-to destination
                      for those seeking not just products, but a personalized
                      expression of their unique lifestyle. Join us in the
                      pursuit of creating spaces that embrace tranquility,
                      warmth, and individuality – because your comfort is our
                      mission. {""}
                    </span>
                    <i
                      className="read-less"
                      onClick={() => setIsMission(false)}
                    >
                      read less
                    </i>
                  </>
                )}
              </p>
            </div>

            <div className="vision-con about">
              <div className="logo"></div>
              <h3>Vision</h3>
              <p>
                At ComfiableHomes, we envision a future where the act of
                designing one's comfort zone becomes a transformative and
                delightful journey. Our vision is to be the ultimate destination
                for individuals seeking a harmonious blend of style and
                comfort...{" "}
                {!isVision && (
                  <i className="read-more" onClick={() => setIsVision(true)}>
                    read more
                  </i>
                )}
                {isVision && (
                  <>
                    <span>
                      in every facet of their lives. We strive to continually
                      innovate, offering an evolving array of curated products
                      that not only meet but exceed the evolving needs and
                      desires of our customers. As we grow, we aspire to become
                      a trusted source, fostering a community that shares a
                      passion for creating spaces that not only reflect personal
                      style but also evoke a sense of joy, relaxation, and
                      well-being. At ComfiableHomes, we believe in empowering
                      everyone to design a life of comfort and sophistication,
                      making every home a haven. {""}
                    </span>
                    <i className="read-less" onClick={() => setIsVision(false)}>
                      read less
                    </i>
                  </>
                )}
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default ThirdSect;
