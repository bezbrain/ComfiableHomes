import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/context";
import SearchHover from "./SearchHover";
import { getAllProducts } from "../apis/products";
import { toast } from "react-toastify";

// let getHomeImages;
const HomeImages = () => {
  const {
    homeProducts,
    setHomeProducts,
    isLoading,
    setIsLoading,
    setHoveredIndex,
  } = useGlobalContext();

  const dispalyHomeData = async () => {
    try {
      setIsLoading(true);
      const { products } = await getAllProducts();

      // Select random indices
      let productIndices = [];
      for (let i = 0; i < 3; i++) {
        const randomProduct = Math.floor(products.length * Math.random());
        productIndices.push(randomProduct);
      }
      // Randomly pick three items from all products
      let homeProduct = [];
      for (let i = 0; i < productIndices.length; i++) {
        const indices = productIndices[i];
        homeProduct.push(products[indices]);
      }

      setHomeProducts(homeProduct);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dispalyHomeData();
  }, []);

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
            const { _id, image, type, price } = each;
            return (
              <div className="image-text-con" key={i}>
                <div
                  className="each-image-con"
                  onMouseOver={() => handleMouseOver(_id)}
                  onMouseOut={() => handleMouseOut(_id)}
                >
                  <SearchHover id={_id} />
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
