import { useGlobalContext } from "../components/context";
import Loader from "../components/loader";
import "../styles/product.css";

const Products = () => {
  const { isLoading, allProducts } = useGlobalContext();

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
              <option value=""></option>
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
        <section className="products-images-sect">
          <header className="product-header">
            <p>22 products Found</p>
            <hr className="wobble" />
            <p>Sort By</p>
            <select name="" id="">
              <option value=""></option>
              <option value="">Price (Lowest)</option>
              <option value="">Price (Highest)</option>
              <option value="">Name (A-Z)</option>
              <option value="">Name (Z-A)</option>
            </select>
          </header>
          <section className="loader-images-sect">
            {isLoading && <Loader loaderCss="add-product-loader-css" />}
            {allProducts &&
              allProducts.map((each, i) => {
                const { id, image, type, price } = each;
                return (
                  <div className="product-images-con" key={id}>
                    <div className="image-con">
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
