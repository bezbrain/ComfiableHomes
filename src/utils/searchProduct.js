import { productSorting } from "../apis/search";

// Search for product
export const sortProducts = async (type, category, company, sortBy) => {
  const { products } = await productSorting(type, category, company, sortBy);
  // console.log(products);
  return products;
};
