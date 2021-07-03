import axios from 'axios'; //引用axios
import store from "@/store/index.js";
// import router from "./router.js";
// import router from 'vue-router';
// import router from "@​nuxtjs/router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    token && (config.headers["X-Token"] = `${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 攔截
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      response
    } = error;

    if (response) {
      errorHandle(response.status, response.data.error, response);
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

// 錯誤捕捉
const errorHandle = (status, msg, response) => {
  switch (status) {
    case 400:
      console.log(response);
      // to404Page();
      break;

    case 401:
      console.log(response);
      tokenExpire();
      break;

    case 403:
      console.log(response);
      // to404Page();
      break;

    case 404:
      console.log(response);
      // to404Page();
      break;

    case 500:
      console.log(response);
      // to404Page();
      break;

    default:
      console.log(response);
      // to404Page();
      break;
  }
};

const tokenExpire = () => {
  store().dispatch("FedLogOut");
  // console.log(router);
  // router.replace({ name: "login" });
};

export default service
