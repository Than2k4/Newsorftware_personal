import axios from "axios";

// Tạo instance với baseURL từ biến môi trường
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Thêm interceptor cho request
instance.interceptors.request.use(
  function (config) {
    // Gắn token vào header Authorization
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
instance.interceptors.response.use(
  function (response) {
    // Chỉ return phần data thay vì cả object
    if (response && response.data) return response.data;
    return response;
  },
  function (error) {
    if (error?.response?.data) return error.response.data;
    return Promise.reject(error);
  }
);

export default instance;
