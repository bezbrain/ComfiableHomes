import { useState } from "react";
import "../../styles/sharedLayouts/footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-bg">
        <div className="footer">
          <div className="copyright-con">
            <div>c</div>
            <p>2023</p>
            <div className="brand-name">ComfiableHomes</div>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
