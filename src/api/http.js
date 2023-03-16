import { message } from "antd";
import axios from "axios";

import qs from "qs";

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = "http://localhost:11212";
} else {
  axios.defaults.baseURL = "http://localhost:11212";
}


axios.defaults.transformRequest = [
  function (data) {
    return qs.stringify(data);
  }
];

// create an axios instance
const service = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  //timeout: 20000 // request timeout
}
);

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
service.interceptors.request.use(
  async (config) => {
    if (config.method === "get") {
      const params = { ...config.params } || {};
      // 由于后台会对传递的参数进行校验，删除 type 为 requestPendingHandler 的相关参数
      if (params.type === "requestPendingHandler") {
        delete params.type;
        delete params.isRequestPending;
      }
      config.params = params;
      //config.params._ = new Date().getTime();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
service.interceptors.response.use(
  async (response) => {
    console.log("resp", response);
    // if (response.status !== 200) {
    //   message.error(response.data.msg || 'System Error');
    //   return Promise.reject(response.data);
    // }
    // let data = response.data;
    // if (typeof data !== "object") {
    //   return response.data ? JSON.stringify(response.data) : null;
    // } else {
    return response.data;
    // }
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.jsonPost = (url, params) => {
  return service({
    url: url,
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function (data) {
        return JSON.stringify(data);
      }
    ]
  });
};

service.jsonDelete = (url, params) => {
  return service({
    url: url,
    method: "delete",
    data: params,
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function (data) {
        return JSON.stringify(data);
      }
    ]
  });
};

service.jsonUpdate = (url, params) => {
  return service({
    url: url,
    method: "put",
    data: params,
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function (data) {
        return JSON.stringify(data);
      }
    ]
  });
};

service.jsonGet = (url, params) => {
  return service({
    url: url,
    method: "get",
    data: params,
    headers: {
      "Content-Type": "application/json"
    },
    transformRequest: [
      function (data) {
        return JSON.stringify(data);
      }
    ]
  });
};
service.upload = (url, params) => {
  return service({
    url: url,
    method: "post",
    data: params,
    responseType: "arraybuffer"
  });
};

export default service;
