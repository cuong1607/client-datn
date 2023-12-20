const LocalStorage = {
  getToken: () =>
    typeof window !== "undefined" && localStorage?.getItem("token"),
  setToken: (token: string) =>
    typeof window !== "undefined" && localStorage?.setItem("token", token),
  getUserId: () =>
    typeof window !== "undefined" && localStorage?.getItem("userId"),
  setUserId: (id: string) =>
    typeof window !== "undefined" && localStorage?.setItem("userId", id),
  removeToken: () =>
    typeof window !== "undefined" && localStorage?.removeItem("token"),
  getBG: () => typeof window !== "undefined" && localStorage?.getItem("bg"),
  setBG: (bg: string) =>
    typeof window !== "undefined" && localStorage?.setItem("bg", bg),
  getVersion: () =>
    typeof window !== "undefined" && localStorage?.getItem("version"),
  setVersion: (version: string) =>
    typeof window !== "undefined" && localStorage?.setItem("version", version),
};

export default LocalStorage;
