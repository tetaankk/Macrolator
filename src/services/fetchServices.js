import axios from "axios";
const baseUrl = "http://macrolator.herokuapp.com/fetch/";

const get = (toSearch) => {
  return axios.get(`${baseUrl}${toSearch}`);
};
// eslint-disable-next-line
export default { get };
