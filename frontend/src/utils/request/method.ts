import axiosInstance from "@/utils/request/axios";
export interface ApiResult<T> {
  code: 200 | 400 | 401 | 403 | 404 | 500;
  msg: string;
  data: T;

}
export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.get<ApiResult<T>>(url, { params });
  return response.data;
}
export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.post<ApiResult<T>>(url, data);
  return response.data;
}
export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.put<ApiResult<T>>(url, data);
  return response.data;
}
export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await axiosInstance.delete<ApiResult<T>>(url, { params });
  return response.data;
}
