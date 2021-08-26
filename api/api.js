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
        appKey: "Client",
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

  UpdateClient(data) { //userClient
    return request({
      url: "/Users/UpdateClient",
      method: "post",
      data
    });
  },

  getOrgsTree() {
    return request({
      url: "/check/getorgstree",
      method: "get",
    });
  },

  logout() {
    return request({
      url: "/check/logout",
      method: "post",
    });
  },

  /* 檢核表 */
  LoadClientMission(params){
    return request({
      url: "/CheckMission/LoadClient",
      method: "get",
      params: params
    })
  },
  
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

  GetMissionById(params) {
    return request({
      url: "/CheckMission/GetById",
      method: "get",
      params: params
    })
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
  AddMissionResult(data) {
    return request({
      url: "/MissionResult/Add",
      method: "post",
      data
    });
  },
  UpdateMissionResult(data) {
    return request({
      url: "/MissionResult/Update",
      method: "post",
      data
    });
  },
  AddOrUpdateDetail(data) {
    return request({
      url: "/MissionResultDetail/AddOrUpdateBatch",
      method: "post",
      data
    });
  },
  GetByMissionResultByMissionId(params) {
    return request({
      url: "/MissionResult/GetByMissionId",
      method: "get",
      params: params
    });
  },
  upload(data) {
    return request({
      url: "/Files/Upload",
      method: "post",
      data,
    })
  }
  /*  */
}

export default api;