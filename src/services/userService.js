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

const createUser = (dataUser) => {
  return axios.post("/api/create-new-user", dataUser);
};

const editUser = (dataUser) => {
  return axios.post("/api/put-edit-user", dataUser);
};

export { handleLogin, getAllUsers, deleteUser, createUser, editUser };
