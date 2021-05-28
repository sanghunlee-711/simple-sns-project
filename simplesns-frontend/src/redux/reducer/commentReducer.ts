interface CommentState {
  id: number;
  comment: string;
  updateComment: string;
}
// 유니온 타입으로 계속 추가하자
type CommentAction =
  | ReturnType<typeof postCommentData>
  | ReturnType<typeof deleteCommentData>
  | ReturnType<typeof putCommentData>;

//Action Type
export const types = {
  POST_COMMENT: "comment/POST_COMMENT" as const,
  DELETE_COMMENT: "comment/DELETE_COMMENT" as const,
  PUT_COMMENT: "comment/PUT_COMMENT" as const,
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

export const putCommentData = (id: number, updateComment: string) => ({
  type: types.PUT_COMMENT,
  payload: { id, updateComment },
});

//action
export const actions = {
  postCommentData,
  deleteCommentData,
  putCommentData,
};

//InitialState
export const INITIAL_STATE: CommentState = {
  id: 0,
  comment: "",
  updateComment: "",
};

//Reducer
export const commentReducer = (
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

    case "comment/PUT_COMMENT":
      return {
        ...state,
        id: action.payload.id,
        updateComment: action.payload.updateComment,
      };

    default:
      return state;
  }
};

export default commentReducer;
