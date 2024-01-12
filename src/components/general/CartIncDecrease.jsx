import "../../styles/singleproduct.css";

const CartIncDecrease = ({
  cartCSS,
  increase,
  decrease,
  itemValue,
  singleInc,
}) => {
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
