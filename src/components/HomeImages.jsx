import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "./context";

const HomeImages = () => {
  const { products, setProducts, isLoading, setIsLoading } = useGlobalContext();
  const [hoveredIndex, setHoveredIndex] = useState(false);

  const getHomeProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");

      const getProduct = data.filter((each) => {
        return each.id % 6 === 0;
      });
      // console.log(getProduct);
      localStorage.setItem("HomeImages", JSON.stringify(getProduct));
      const getHomeImages = JSON.parse(localStorage.getItem("HomeImages"));
      setProducts(getHomeImages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeProducts();
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
        {products.map((each, i) => {
          const { id, image, type, price } = each;
          return (
            <div className="image-text-con" key={id}>
              <div
                className="each-image-con"
                onMouseOver={() => handleMouseOver(i)}
                onMouseOut={() => handleMouseOut(i)}
              >
                <div className="img-overlay"></div>
                {i === hoveredIndex && <FaSearch className="search-icon" />}
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
