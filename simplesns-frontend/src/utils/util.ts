import { CLIENT_SECRET } from "../config/config.json";

export const config = {
  headers: {
    authorization: sessionStorage.getItem("token"),
    key: CLIENT_SECRET,
  },
};
