import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { RequestConfig, RequestInterceptors } from "./types";

class Request {
  instace: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  constructor(config: RequestConfig) {
    this.instace = axios.create(config);
    this.interceptorsObj = config.interceptors;
    this.instace.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        console.log("全局请求拦截器");
        return res;
      },
      (err: any) => {
        return err;
      }
    );
    // 使用实例拦截器
    this.instace.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    );
    this.instace.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch
    );
    // 全局响应拦截器保证最后执行
    this.instace.interceptors.response.use((res: AxiosResponse) => {
      return res.data;
    });
  }
  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as any);
      }
      this.instace
        .request<any, T>(config)
        .then((res) => {
          // 单个响应拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }
}
export default Request;
