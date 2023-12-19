import AxiosClient from "../../axiosClient";

export interface IProduct {
  product_price_id: number;
  quantity: number;
}
export interface IDataOrder {
  payment_method: string;
  name: string;
  phone_number: string;
  df_province_id: number;
  df_district_id: number;
  df_ward_id: number;
  address: number;
  list_product: IProduct[];
}
export const OrderService = {
  order: (data: IDataOrder) => {
    const url = `/order`;
    return AxiosClient.post(url, data);
  },
};
