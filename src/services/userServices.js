import axios from "axios";
const baseUrl = "https://macrolator.herokuapp.com/";

const login = (user) => {
  return axios.post(`${baseUrl}auth`, user);
};

const register = (newUser) => {
  return axios.post(`${baseUrl}users/add`, newUser);
};
export default { login, register };
