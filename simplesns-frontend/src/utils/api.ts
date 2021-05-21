import axios from "axios";
import { BASE_URL } from "../config/config.json";
import { config } from "../utils/util";

export const PostCommentData = async (postId: string, inputComment: string) => {
  const body = {
    postId,
    comment: inputComment,
  };

  const response = await axios.post(`${BASE_URL}/comment`, body, config);
  return response;
};

export const DeleteCommentData = async (commentId: string) => {
  const url = `${BASE_URL}/comment/delete/${commentId}`;

  const response = await axios.delete(url, config);
  return response;
};
