import "../styles/singleproduct.css";
import { useGlobalContext } from "./context";

const CartIncDecrease = ({ cartCSS }) => {
  const { cartCount, setCartCount } = useGlobalContext();

  const increaseHandler = () => {
    if (cartCount > 0 && cartCount < 10) {
      setCartCount(cartCount + 1);
    }
  };

  const decreaseHandler = () => {
    if (cartCount > 1) {
      setCartCount(cartCount - 1);
    }
  };

  return (
    <>
      <div className={`count-con ${cartCSS}`}>
        <button className="decrease" onClick={decreaseHandler}>
          -
        </button>
        <p>{cartCount}</p>
        <button className="increase" onClick={increaseHandler}>
          +
        </button>
      </div>
    </>
  );
};

export default CartIncDecrease;
