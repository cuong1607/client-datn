import AxiosClient from "../../axiosClient";

export interface IQuery {
  page: number;
  name?: string;
  category_id?: number;
  status?: number | string;
  limit?: number;
  fromDate?: string;
  toDate?: string;
}

export const CategoryService = {
  get: (params: IQuery) => {
    const url = `/category`;
    return AxiosClient.get(url, { params: { ...params, limit: 999 } });
  },
};

export const ConfigSetting = {
  getPrice: (params: IQuery) => {
    const url = `/price`;
    return AxiosClient.get(url, { params: { ...params, limit: 999 } });
  },
  getColor: (params: IQuery) => {
    const url = `/color`;
    return AxiosClient.get(url, { params: { ...params, limit: 999 } });
  },
  getSize: (params: IQuery) => {
    const url = `/size`;
    return AxiosClient.get(url, { params: { ...params, limit: 999 } });
  },
};