import { productSorting } from "../apis/search";

// Search for product
export const sortProducts = async (
  type,
  category,
  company,
  setAllProducts,
  toast
) => {
  try {
    const { products } = await productSorting(type, category, company);
    setAllProducts(products);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message || error.message);
  }
};
