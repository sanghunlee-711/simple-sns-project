import axios from "axios";
import { BASE_URL } from "../../config/config.json";
import { config } from "../util";

export const PutPostData = async (
  postId: string,
  changedContent: string,
  titleImgUrl: string,
  title: string
) => {
  const url = `${BASE_URL}/post/update`;
  const body = {
    postId,
    content: changedContent,
    titleImgUrl,
    title,
  };
  const response = await axios.put(url, body, config);

  return response;
};

export const GetHashTagData = async (hashTagText: string) => {
  const params = hashTagText;
  const url = `${BASE_URL}/hashtag/`;

  const response = await axios.get(url + params, config);
  return response;
};
