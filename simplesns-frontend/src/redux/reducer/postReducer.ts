interface PostState {
  userId: number;
  userNick: string;
  tokenCheck: boolean;
}
type PostAction =
  | ReturnType<typeof checkTokenData>
  | ReturnType<typeof getTokenData>;

export const types = {
  CHECK_TOKEN: "post/CHECK_TOKEN" as const,
  GET_TOKEN_DATA: "post/GET_TOKEN_DATA" as const,
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

export const actions = {
  checkTokenData,
  getTokenData,
};

export const INITIAL_STATE: PostState = {
  userId: 0,
  userNick: "",
  tokenCheck: false,
};

export const postReducer = (
  state: PostState = INITIAL_STATE,
  action: PostAction
) => {
  switch (action.type) {
    case "post/CHECK_TOKEN":
      return { ...state };

    case "post/GET_TOKEN_DATA":
      return {
        ...state,
        userId: action.payload.userId,
        userNick: action.payload.userNick,
        tokenCheck: action.payload.tokenCheck,
      };

    default:
      return state;
  }
};

export default postReducer;
