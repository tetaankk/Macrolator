import axios from "axios";
const baseUrl = "http://localhost:5000/";

const login = (user) => {
  return axios.post(`${baseUrl}auth`, user);
};

const register = (newUser) => {
  return axios.post(`${baseUrl}users/add`, newUser);
};
export default { login, register };
