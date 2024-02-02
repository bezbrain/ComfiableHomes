export const saveUsername = (username) => {
  return sessionStorage.setItem("username", username);
};

export const getUsername = () => {
  return sessionStorage.getItem("username");
};

export const removeUsername = () => {
  return sessionStorage.removeItem("username");
};
