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

export const ProductService = {
  get: (params: IQuery) => {
    const url = `/product`;
    return AxiosClient.get(url, { params: { ...params, limit: 999 } });
  },
  getDetail: (id: number) => {
    const url = `/product/${id}`;
    return AxiosClient.get(url);
  },
};
