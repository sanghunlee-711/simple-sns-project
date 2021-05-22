interface PostState {
  userId: number;
  userNick: string;
  tokenCheck: boolean;
  postId: number;
  changedContent: string;
  titleImgUrl: string;
  title: string;
}
type PostAction =
  | ReturnType<typeof checkTokenData>
  | ReturnType<typeof getTokenData>
  | ReturnType<typeof modifyContent>
  | ReturnType<typeof getPostId>;

export const types = {
  CHECK_TOKEN: "post/CHECK_TOKEN" as const,
  GET_TOKEN_DATA: "post/GET_TOKEN_DATA" as const,
  PUT_CONTENT_DATA: "post/PUT_CONTENT_DATA" as const,
  GET_POST_ID: "post/GET_POST_ID" as const,
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

export const actions = {
  checkTokenData,
  getTokenData,
  getPostId,
  modifyContent,
};

export const INITIAL_STATE: PostState = {
  userId: 0,
  userNick: "",
  tokenCheck: false,
  postId: 0,
  changedContent: "",
  titleImgUrl: "",
  title: "",
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

    case "post/GET_POST_ID":
      return { ...state, postId: action.payload };

    default:
      return state;
  }
};

export default postReducer;
