import request from "./request";
import {
  getToken
} from "./auth"; // 驗權

export function login(username, password) {
  return request({
    url: "/check/login",
    method: "post",
    data: {
      account: username,
      password: password,
      appKey: "system",
      mobileDevice: "",
      pushKey: "",
    },
  });
}

export function getUserProfile() {
  return request({
    url: "/check/getuserprofile",
    method: "get",
    params: { token: getToken() },
  });
}

export function logout() {
  return request({
    url: "/check/logout",
    method: "post",
  });
}

export function LoadMission(params) {
  return request({
    url: "/CheckMission/Load",
    method: "get",
    params: params
  });
}
