import { categorySort, search } from "../apis/search";

// Search for product
export const inputSearch = async (setAllProducts, searchValue, toast) => {
  try {
    const { products } = await search(searchValue);
    setAllProducts(products);
  } catch (error) {
    // console.log(error);
    toast.error(error.response.data.message || error.message);
  }
};

// Sort for product by category
export const searchProduct = async (
  cat,
  id,
  setBorderBottom,
  setAllProducts,
  toast
) => {
  try {
    const { products } = await categorySort(cat);
    setBorderBottom(id);
    setAllProducts(products);
  } catch (error) {
    // console.log(error);
    toast.error(error.response.data.message || error.message);
  }
};
