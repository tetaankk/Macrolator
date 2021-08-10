import axios from "axios";
const baseUrl = "http://macrolator.herokuapp.com/fetch/";

const get = (toSearch) => {
  return axios.get(`${baseUrl}${toSearch}`);
};

export default { get };
