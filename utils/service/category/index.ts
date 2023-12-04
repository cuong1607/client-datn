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
