import React from "react";
import "../styles/payment/payment.css";

const Payment = () => {
  return (
    <main className="payment__page">
      <form>
        <h2>Make your payment via Paystack</h2>
        <p>
          On the next page, you will be allowed to select your prefered payment
          method
        </p>

        <section className="payment__input__section">
          <div>
            <label>ENTER EMAIL TO GET YOUR RECEIPT</label>
            <br />
            <input type="text" placeholder="email@gmail.com" />
          </div>
          <div>
            <label>YOU CHECKOUT AMOUNT HERE</label>
            <br />
            <input type="number" />
          </div>
        </section>
      </form>
    </main>
  );
};

export default Payment;
