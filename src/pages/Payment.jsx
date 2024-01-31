import React from "react";
import "../styles/payment/payment.css";

const Payment = () => {
  return (
    <main className="payment__page">
      <form>
        <div className="payment__header">
          <h2>Make your payment via Paystack</h2>
          <p>
            On the next page, you will be allowed to select your prefered
            payment method
          </p>
        </div>

        <section className="payment__input__section">
          <div className="email__input">
            <label>ENTER EMAIL TO GET YOUR RECEIPT</label>
            <br />
            <input type="text" placeholder="email@gmail.com" />
          </div>
          <div className="amount__input">
            <label>YOU CHECKOUT AMOUNT HERE</label>
            <br />
            <input type="number" readOnly />
          </div>
          <button className="make__payment__btn">GO MAKE PAYMENT</button>
        </section>
      </form>
    </main>
  );
};

export default Payment;
