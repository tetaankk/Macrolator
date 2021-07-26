import axios from "axios";
const baseUrl = "http://localhost:5000/foods/";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
};

const create = (portionObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = axios.post(baseUrl + "add", portionObject, config);
  return response.data;
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
};

const update = (id, foodObject) => {
  const request = axios.put();
};

export default { getAll, create, update, remove, setToken };
