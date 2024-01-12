import React from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useGlobalContext } from "../../../contexts/context";
import { useApiContext } from "../../../contexts/apiContext";

const CartDelete = ({ id }) => {
  const { handleCartProduct, handleDeleteCart } = useApiContext();
  const { setShowNav } = useGlobalContext();

  const authToken = sessionStorage.getItem("authToken");

  return (
    <td>
      <FaTrash
        className="delete-product"
        onClick={async () => {
          await handleDeleteCart(id, toast);
          await handleCartProduct(authToken, toast, setShowNav); // Call this function to get the remaining data after deleting from db
        }}
      />
    </td>
  );
};

export default CartDelete;
