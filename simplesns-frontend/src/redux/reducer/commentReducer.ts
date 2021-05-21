interface CommentState {
  id: number;
  comment: string;
  loading: boolean;
}

//Action Type
export const types = {
  POST_COMMENT: "comment/POST_COMMENT" as const,
  DELETE_COMMENT: "comment/DELETE_COMMENT" as const,
  SET_COMMENT_LOADING: "comment/SET_COMMENT_LOADING" as const,
};

export const postCommentData = (id: number, comment: string) => ({
  type: types.POST_COMMENT,
  payload: { id, comment },
});
export const deleteCommentData = (id: number) => ({
  type: types.DELETE_COMMENT,
  payload: id,
});

export const setCommentLoading = (loadingState: boolean) => ({
  type: types.SET_COMMENT_LOADING,
  payload: loadingState,
});

//action
export const actions = {
  postCommentData,
  setCommentLoading,
  deleteCommentData,
};

// 유니온 타입으로 계속 추가하자
type CommentAction =
  | ReturnType<typeof postCommentData>
  | ReturnType<typeof setCommentLoading>
  | ReturnType<typeof deleteCommentData>;

//InitialState
export const INITIAL_STATE: CommentState = {
  id: 0,
  comment: "",
  loading: false,
};

//Reducer
export const navReducer = (
  state: CommentState = INITIAL_STATE,
  action: CommentAction
) => {
  switch (action.type) {
    case "comment/POST_COMMENT":
      return {
        ...state,
        id: action.payload.id,
        comment: action.payload.comment,
      };
    case "comment/DELETE_COMMENT":
      return { ...state, id: action.payload };

    case "comment/SET_COMMENT_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default navReducer;
