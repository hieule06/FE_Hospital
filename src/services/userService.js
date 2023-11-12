import axios from "../axios";

const handleLogin = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (userId) => {
  return axios.get(`api/get-all-users?id=${userId}`);
};

const deleteUser = (userId) => {
  return axios.get(`delete-user?id=${userId}`);
};

export { handleLogin, getAllUsers, deleteUser };
