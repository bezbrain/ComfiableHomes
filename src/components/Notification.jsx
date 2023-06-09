import { useState } from "react";
import "../styles/notification.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useGlobalContext } from "./context";
// import { useRef } from "react";

const Notification = ({ notiText }) => {
  const { successNoti, setSuccessNoti, failureNoti, setFailureNoti } =
    useGlobalContext();
  //   const [notiText, setNotiText] = useState("");
  // console.log(notiRef.current);

  return (
    <>
      <section className="where-to-apply-noti-display">
        <section className="notification">
          <article className="icon-and-text">
            {successNoti && (
              <div className="success-icon">
                <FaCheckCircle />
              </div>
            )}
            {failureNoti && (
              <div className="failure-icon">
                <FaTimesCircle />
              </div>
            )}
            <p>{notiText}</p>
          </article>
          {successNoti && <article className="success-drain"></article>}
          {failureNoti && <article className="failure-drain"></article>}
        </section>
      </section>
    </>
  );
};

export default Notification;
