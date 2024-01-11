import axios from "axios";
import queryString from "query-string";

// export const productSorting = async (type, category, company) => {
//   const token = sessionStorage.getItem("authToken");
//   const { data } = await axios.get(
//     `https://comfiable-homes.onrender.com/api/v1/products/?category=${category}&brand=${company}&search=${type}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   console.log(data);
//   console.log(type, category, company);
//   return data;
// };

export const productSorting = async (type, category, company, sortBy) => {
  const token = sessionStorage.getItem("authToken");
  // Construct the query parameters using query-string library
  const queryParams = queryString.stringify({
    search: type,
    category: category,
    brand: company,
    sort: sortBy,
  });
  // console.log(queryParams);
  const { data } = await axios.get(
    `https://comfiable-homes.onrender.com/api/v1/products?${queryParams}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(data);
  // console.log(type, category, company);
  return data;
};
