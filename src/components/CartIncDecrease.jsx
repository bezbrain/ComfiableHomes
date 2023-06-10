import { useState } from "react";
import "../styles/singleproduct.css";
import { useGlobalContext } from "./context";

const CartIncDecrease = ({
  cartCSS,
  increase,
  decrease,
  itemValue,
  singleInc,
}) => {
  const { count, setCount, getCartItems } = useGlobalContext();
  // const [count, setCount] = useState(itemValue);

  // const

  return (
    <>
      <div className={`count-con ${cartCSS}`}>
        <button className="decrease" onClick={decrease}>
          -
        </button>
        <p>{itemValue}</p>
        <button className="increase" onClick={(increase, singleInc)}>
          +
        </button>
      </div>
    </>
  );
};

export default CartIncDecrease;
