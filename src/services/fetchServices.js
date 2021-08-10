import axios from "axios";
const baseUrl = "https://macrolator.herokuapp.com/fetch/";

const get = (toSearch) => {
  return axios.get(`${baseUrl}${toSearch}`);
};

export default { get };
