import { useGlobalContext } from "../components/context";
import Loader from "../components/Loader";
import SearchHover from "../components/SearchHover";
import "../styles/product.css";
import "../styles/product2.css";

const Products = () => {
  const { isLoading, allProducts, setHoveredIndex } = useGlobalContext();

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseOut = () => {
    setHoveredIndex(false);
  };

  return (
    <>
      <main className="products">
        {/* Left hand side */}
        <aside>
          <input type="text" placeholder="Search" />
          <div className="category">
            <h3>Category</h3>
            <div>
              <ul>
                <li>All</li>
                <li>Office</li>
                <li>Living Room</li>
                <li>Kitchen</li>
                <li>Bedroom</li>
                <li>Dining</li>
                <li>Kids</li>
              </ul>
            </div>
          </div>
          <div className="company-con">
            <h3>Company</h3>
            <select name="" id="">
              <option value="">all</option>
              <option value="">caressa</option>
              <option value="">ikea</option>
              <option value="">liddy</option>
              <option value="">marcos</option>
            </select>
          </div>
          <div className="radio-price-con">
            <label htmlFor="price">$3,099.99</label>
            <br />
            <input
              type="range"
              id="price"
              name="price"
              min="0"
              max="3099.99"
              // value="3099.99"
            />
          </div>
          <button className="clear-filter-btn">Clear Filters</button>
        </aside>
        {/* Right hand side */}
        <section className="products-images-sect scrolling-section">
          <header className="product-header">
            <p>
              {allProducts.length} product{allProducts.length < 2 ? "" : "s"}{" "}
              Found
            </p>
            <hr className="wobble" />
            <div className="sort-con">
              <p>Sort By: </p>
              <select name="" id="">
                <option value="">Price (Lowest)</option>
                <option value="">Price (Highest)</option>
                <option value="">Name (A-Z)</option>
                <option value="">Name (Z-A)</option>
              </select>
            </div>
          </header>
          <section className="loader-and-image-sect">
            {isLoading && <Loader loaderCss="add-product-loader-css" />}
            {allProducts &&
              allProducts.map((each, i) => {
                const { id, image, type, price } = each;
                return (
                  <div className="product-images-con" key={id}>
                    <div
                      className="image-con"
                      onMouseOver={() => handleMouseOver(id)}
                      onMouseOut={() => handleMouseOut(id)}
                    >
                      <SearchHover id={id} />
                      <img src={image} alt={type} />
                    </div>
                    <div className="name-and-amt-con">
                      <p>{type}</p>
                      <p>${price}</p>
                    </div>
                  </div>
                );
              })}
          </section>
        </section>
      </main>
    </>
  );
};

export default Products;
