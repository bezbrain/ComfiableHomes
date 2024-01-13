import React from "react";

const DeliveryInfo = () => {
  return (
    <form>
      <h2>Delivery Information</h2>
      <div>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
      </div>
      <input type="text" placeholder="Address" />
      <div>
        <input type="text" placeholder="City/Town" />
        <input type="text" placeholder="Zip Code" />
      </div>
      <div>
        <input type="text" placeholder="Mobile Number" />
        <input type="text" placeholder="Email Address" />
      </div>
    </form>
  );
};

export default DeliveryInfo;
