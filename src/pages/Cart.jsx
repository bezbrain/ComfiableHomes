import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "../styles/cart.css";
import { useGlobalContext } from "../components/context";
import CartIncDecrease from "../components/CartIncDecrease";
import Notification from "../components/Notification";
import { ACTIONS } from "../components/context";

const Cart = () => {
  const { initState, dispatch, notification, successNoti } = useGlobalContext();

  // console.log(initState);

  const handleDeleteCart = (index) => {
    dispatch({
      type: ACTIONS.DELETE_FROM_CART,
      payload: { filterId: index },
    });
  };

  return (
    <>
      {notification && (
        <Notification
          notiText={`${
            successNoti ? "Added to cart" : "Product already in cart"
          }`}
        />
      )}
      <section className="cart-sect">
        {initState.length === 0 ? (
          <>
            <h2>Your cart is empty</h2>
            <Link to="/products" className="fill-it-btn">
              FILL IT
            </Link>
          </>
        ) : (
          <>
            <table className="cart-content">
              <tbody>
                <tr className="header-of-cart">
                  <td>Items</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Subtotal</td>
                  <td></td>
                </tr>
                {initState &&
                  initState.map((each, i) => {
                    const { id, image, name, price } = each;
                    return (
                      <tr className="body-of-cart" key={i}>
                        <td>
                          <img src={image} alt={name} />
                          <p>{name}</p>
                        </td>
                        <td>${price}</td>
                        <td>
                          <CartIncDecrease />
                        </td>
                        <td>$92.97</td>
                        <td>
                          <FaTrash
                            className="delete-product"
                            onClick={() => handleDeleteCart(id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* Static base of cart page */}
            <div className="base-btns">
              <Link to="/products">
                Continue <span>Shopping</span>
              </Link>
              <button className="clear-shopping-cart-btn">Clear Cart</button>
            </div>
            <section className="base-total">
              <table className="cart-summary">
                <tbody>
                  <tr>
                    <th>Subtotal :</th>
                    <th>$92.97</th>
                  </tr>
                  <tr>
                    <td>Shipping Fee :</td>
                    <td>$5.34</td>
                  </tr>
                  <tr>
                    <th>Order Total :</th>
                    <th>$98.32</th>
                  </tr>
                </tbody>
              </table>
              <Link>LOGIN</Link>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
