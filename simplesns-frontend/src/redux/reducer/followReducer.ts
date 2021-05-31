interface FollowState {
  followId: number;
}

type FollowAction =
  | ReturnType<typeof sendFollow>
  | ReturnType<typeof getFollowData>;

export const types = {
  SEND_FOLLOW: "follow/SEND_FOLLOW" as const,
  GET_FOLLOW_DATA: "follow/GET_FOLLOW_DATA" as const,
};

export const sendFollow = (followId: number) => ({
  type: types.SEND_FOLLOW,
  payload: { followId },
});

export const getFollowData = () => ({
  type: types.GET_FOLLOW_DATA,
});

export const actions = {
  sendFollow,
  getFollowData,
};

export const INITIAL_STATE: FollowState = {
  followId: 0,
};

export const followReducer = (
  state: FollowState = INITIAL_STATE,
  action: FollowAction
) => {
  switch (action.type) {
    case "follow/SEND_FOLLOW":
      console.log("안함??");
      return {
        ...state,
        follwId: action.payload.followId,
      };
    case "follow/GET_FOLLOW_DATA":
      return { ...state };

    default:
      return state;
  }
};
export default followReducer;
