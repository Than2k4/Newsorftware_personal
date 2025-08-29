import axios from "./axios.customize";

// API tạo user (Register)
const createUserApi = (name, email, password) => {
  const URL_API = "/v1/api/register";
  return axios.post(URL_API, { name, email, password });
};

// API login
const loginApi = (email, password) => {
  const URL_API = "/v1/api/login";
  return axios.post(URL_API, { email, password });
};

// API lấy thông tin user (sau khi login)
const getUserApi = () => {
  const URL_API = "/v1/api/user";
  return axios.get(URL_API);
};

export {
  createUserApi,
  loginApi,
  getUserApi
};
