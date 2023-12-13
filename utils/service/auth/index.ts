import AxiosClient from "../../axiosClient";

interface IData {
  phone: string;
  password: string;
}
interface IDataRegister {
  full_name: string;
  phone: string;
  email: string;
  password: string;
}
export const AuthService = {
  login: (data: IData) => {
    const url = `/user-session/login`;
    return AxiosClient.post(url, data);
  },
  register: (data: IDataRegister) => {
    const url = `/user-session/register`;
    return AxiosClient.post(url, data);
  },
};
