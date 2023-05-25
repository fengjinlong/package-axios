import { Result } from "./1";
import Request from "./index";
import { RequestConfig } from "./types";
const request = new Request({
  headers: {},
  baseURL: "https://eolink.o.apispace.com/",
  timeout: 5000,
  interceptors: {
    requestInterceptors: (config) => {
      console.log("单个请求拦截器");
      return config;
    },
    responseInterceptors: (res) => {
      console.log("单个响应拦截器");
      return res;
    },
  },
});
export interface YWZResponse {
  status: number;
  result: Result;
}
// 重写返回类型
interface YWZRequestConfig<T, R> extends RequestConfig<YWZResponse> {
  data?: T;
}

const ywzRequest = <D = any, T = any>(config: YWZRequestConfig<D, T>) => {
  const { method = "GET" } = config;
  if (method === "get" || method === "GET") {
    config.params = config.data;
  }
  return request.request<YWZResponse>(config);
};
// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

export default ywzRequest;
