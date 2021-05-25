import axios from "axios";
import { BASE_URL } from "../../config/config.json";
import { config } from "../util";

export const getSearchData = async (searchInput: string) => {
  const url = `${BASE_URL}/${searchInput}`;
  const response = await axios.get(url, config);
  return response;
};
