import { productSorting } from "../apis/search";

// Search for product
export const sortProducts = async (
  type,
  category,
  company,
  sortBy,
  maxPrice
) => {
  const { products } = await productSorting(
    type,
    category,
    company,
    sortBy,
    maxPrice
  );
  // console.log(products);
  return products;
};
