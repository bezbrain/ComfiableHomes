import { productSorting } from "../apis/search";

// Search for product
export const sortProducts = async (type, category, company) => {
  const { products } = await productSorting(type, category, company);
  // console.log(products);
  return products;
};
