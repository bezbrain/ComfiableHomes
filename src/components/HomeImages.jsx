import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "./context";
import SearchHover from "./SearchHover";
import { products } from "../data";

// let getHomeImages;
const HomeImages = () => {
  const {
    homeProducts,
    setHomeProducts,
    isLoading,
    setIsLoading,
    setHoveredIndex,
  } = useGlobalContext();

  const dispalyHomeData = () => {
    // setIsLoading(true);
    const homeProduct = products.filter((each) => each.id % 6 === 0);
    setHomeProducts(homeProduct);
  };

  useEffect(() => {
    dispalyHomeData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [homeProducts]);

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    setHoveredIndex(false);
  };

  return (
    <>
      <div className="home-images-con">
        {homeProducts &&
          homeProducts.map((each, i) => {
            const { id, image, type, price } = each;
            return (
              <div className="image-text-con" key={id}>
                <div
                  className="each-image-con"
                  onMouseOver={() => handleMouseOver(id)}
                  onMouseOut={() => handleMouseOut(id)}
                >
                  <SearchHover id={id} />
                  <img src={image} alt="Home-img" className="home-images" />
                </div>
                <section className="img-text-sect">
                  <p>{type}</p>
                  <p>${price}</p>
                </section>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomeImages;
