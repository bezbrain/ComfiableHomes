import React, { useEffect, useRef } from "react";
import "../styles/payment/payment.css";
import { paymentGlobalContext } from "../contexts/paymentContext";
import { useCheckoutContext } from "../contexts/checkoutContext";
import { useApiContext } from "../contexts/apiContext";
import { toast } from "react-toastify";
import { makePayment } from "../apis/payment";

const Payment = () => {
  const { email, setEmail } = paymentGlobalContext();
  const { calculateSubtotal, shippingFee } = useCheckoutContext();
  const { getCartProduct } = useApiContext();

  const amountRef = useRef(null);

  const amount = (
    Number(calculateSubtotal(getCartProduct)) + shippingFee
  ).toFixed(2);

  useEffect(() => {
    console.log(amountRef.current.value);
  }, [amount]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMakePaymentClick = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email cannot be empty");
    } else if (amount !== amountRef.current.value) {
      toast.error("Amount does not correspond with checkout amount");
    } else {
      try {
        await makePayment({
          email: email,
          amount: amount,
        });
        toast.success("Details submitted");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="payment__page">
      <form>
        <div className="payment__header">
          <h2>Make your payment via Paystack</h2>
          <p>
            On the next page, you will be allowed to select your prefered
            payment method.
          </p>
        </div>

        <section className="payment__input__section">
          <div className="email__input">
            <label>ENTER EMAIL TO GET YOUR RECEIPT</label>
            <br />
            <input
              type="text"
              placeholder="email@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="amount__input">
            <label>YOUR CHECKOUT AMOUNT</label>
            <br />
            <input type="number" readOnly value={amount} ref={amountRef} />
          </div>
          <button
            className="make__payment__btn"
            onClick={handleMakePaymentClick}
          >
            GO MAKE PAYMENT
          </button>
        </section>
      </form>
    </main>
  );
};

export default Payment;
