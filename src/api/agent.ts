import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import { Todo } from "../models/todo";
import { Filter } from "../models/filter";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.defaults.baseURL = "http://localhost:3001";

const requests = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axios.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Items = {
  list: (filter?: Filter) =>
    requests.get<Todo[]>(`/items`, {
      params: filter,
    }),
  details: (id: number) => requests.get<Todo>(`/items/${id}`),
  update: (todo: Partial<Todo>) => requests.patch(`/items/${todo.id}`, todo),
  create: (todo: Todo) => requests.post("/items", todo),
  delete: (id: number) => requests.del(`/items/${id}`),
};

const agent = {
  Items,
};

export default agent;
