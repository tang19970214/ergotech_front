import request from "./request";
import {
  getToken
} from "./auth"; // 驗權

const api = {
  login(username, password) {
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
    })
  },

  getUserProfile() {
    return request({
      url: "/check/getuserprofile",
      method: "get",
      params: {
        token: getToken()
      },
    });
  },

  logout() {
    return request({
      url: "/check/logout",
      method: "post",
    });
  },

  /* 檢核表 */
  LoadMission(params) {
    return request({
      url: "/CheckMission/Load",
      method: "get",
      params: params
    });
  },

  GetMission(params) {
    return request({
      url: "/CheckMission/Get",
      method: "get",
      params: params
    });
  },
  /*  */

  /* 模組、類型、名稱 */
  LoadCheckModel(params) {
    return request({
      url: "/CheckModel/Load",
      method: "get",
      params: params
    });
  },
  LoadCheckModelItem(params) {
    return request({
      url: "/CheckModelItem/Load",
      method: "get",
      params: params
    });
  },
  LoadCheckModelItemDetail(params) {
    return request({
      url: "/CheckModelItemDetail/Load",
      method: "get",
      params: params
    });
  },
  /*  */
}

export default api;