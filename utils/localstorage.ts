export const loadState = (key: any) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key: any, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {}
};

const LocalStorage = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getBG: () => localStorage.getItem("bg"),
  setBG: (bg: string) => localStorage.setItem("bg", bg),
  getVersion: () => localStorage.getItem("version"),
  setVersion: (version: string) => localStorage.setItem("version", version),
};

export default LocalStorage;
