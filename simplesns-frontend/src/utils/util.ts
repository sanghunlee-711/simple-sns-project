import { CLIENT_SECRET } from "../config/config.json";

export const config = {
  headers: {
    authorization: sessionStorage.getItem("token"),
    key: CLIENT_SECRET,
  },
};

export const config_json_type = {
  ...config,
  "Content-Type": "application/json",
};
