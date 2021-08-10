import axios from "axios";
const baseUrl = "http://localhost:5000/fetch/";

const get = (toSearch) => {
  return axios.get(`${baseUrl}${toSearch}`);
};
export default { get };
