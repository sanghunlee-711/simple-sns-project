import axios from "axios";
import { BASE_URL } from "../../config/config.json";
import { config } from "../util";

export const PutPostData = async (
  postId: string,
  changedContent: string,
  titleImgUrl: string
) => {
  const url = `${BASE_URL}/post/update`;
  const body = {
    postId,
    content: changedContent,
    titleImgUrl,
  };
  const response = await axios.put(url, body, config);

  return response;
};
