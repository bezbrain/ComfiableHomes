import { categorySort } from "../apis/search";

// Sort for product by category
export const searchProduct = async (
  cat,
  id,
  setBorderBottom,
  setAllProducts
) => {
  try {
    const { products } = await categorySort(cat);
    setBorderBottom(id);
    setAllProducts(products);
  } catch (error) {
    console.log(error);
  }
};
