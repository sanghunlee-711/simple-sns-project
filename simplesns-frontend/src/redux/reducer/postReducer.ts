interface PostState {
  userId: number;
  userNick: string;
  tokenCheck: boolean;
  postId: number;
  changedContent: string;
  titleImgUrl: string;
  title: string;
  hashtagText: string;
}
type PostAction =
  | ReturnType<typeof checkTokenData>
  | ReturnType<typeof getTokenData>
  | ReturnType<typeof modifyContent>
  | ReturnType<typeof getPostId>
  | ReturnType<typeof getHashTagData>;

export const types = {
  CHECK_TOKEN: "post/CHECK_TOKEN" as const,
  GET_TOKEN_DATA: "post/GET_TOKEN_DATA" as const,
  PUT_CONTENT_DATA: "post/PUT_CONTENT_DATA" as const,
  GET_POST_ID: "post/GET_POST_ID" as const,
  GET_HASHTAG_DATA: "post/GET_HASHTAG_DATA" as const,
};

export const checkTokenData = () => ({
  type: types.CHECK_TOKEN,
});

export const getTokenData = (
  userId: number,
  userNick: string,
  tokenCheck: boolean
) => ({
  type: types.GET_TOKEN_DATA,
  payload: { userId, userNick, tokenCheck },
});

export const getPostId = (postId: number) => ({
  type: types.GET_POST_ID,
  payload: postId,
});

export const modifyContent = (
  postId: number,
  changedContent: string,
  titleImgUrl: string,
  title: string
) => ({
  type: types.PUT_CONTENT_DATA,
  payload: { postId, changedContent, titleImgUrl, title },
});

export const getHashTagData = (hashtagText: string) => ({
  type: types.GET_HASHTAG_DATA,
  payload: { hashtagText },
});

export const actions = {
  checkTokenData,
  getTokenData,
  getPostId,
  modifyContent,
  getHashTagData,
};

export const INITIAL_STATE: PostState = {
  userId: 0,
  userNick: "",
  tokenCheck: false,
  postId: 0,
  changedContent: "",
  titleImgUrl: "",
  title: "",
  hashtagText: "",
};

export const postReducer = (
  state: PostState = INITIAL_STATE,
  action: PostAction
) => {
  switch (action.type) {
    case "post/CHECK_TOKEN":
      return { ...state };

    case "post/GET_TOKEN_DATA":
      const { userId, userNick, tokenCheck } = action.payload;

      return {
        ...state,
        userId,
        userNick,
        tokenCheck,
      };

    case "post/PUT_CONTENT_DATA":
      const { postId, changedContent, titleImgUrl, title } = action.payload;
      return {
        ...state,
        postId,
        changedContent,
        titleImgUrl,
        title,
      };

    case "post/GET_HASHTAG_DATA":
      const { hashtagText } = action.payload;
      return { ...state, hashtagText };

    case "post/GET_POST_ID":
      return { ...state, postId: action.payload };

    default:
      return state;
  }
};

export default postReducer;
