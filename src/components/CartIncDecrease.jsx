import "../styles/singleproduct.css";

const CartIncDecrease = ({ cartCSS }) => {
  return (
    <>
      <div className={`count-con ${cartCSS}`}>
        <button className="decrease">-</button>
        <p>1</p>
        <button className="increase">+</button>
      </div>
    </>
  );
};

export default CartIncDecrease;
