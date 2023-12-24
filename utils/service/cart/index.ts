import AxiosClient from "../../axiosClient";

export interface IProduct {
  product_price_id: number;
  quantity: number;
}

export const CartService = {
  cart: (data: IProduct) => {
    const url = `/cart`;
    return AxiosClient.post(url, data);
  },
  getCart: () => {
    const url = `/cart`;
    return AxiosClient.get(url);
  },
};
