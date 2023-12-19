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

export const AddressService = {
  getProvince: () => {
    const url = `/province`;
    return AxiosClient.get(url, { params: { limit: 999, page: 1 } });
  },
  getDistrict: (id: number) => {
    const url = `/district`;
    return AxiosClient.get(url, { params: { limit: 999, df_province_id: id } });
  },
  getWard: (id: number) => {
    const url = `/ward`;
    return AxiosClient.get(url, { params: { limit: 999, df_district_id: id } });
  },
};
