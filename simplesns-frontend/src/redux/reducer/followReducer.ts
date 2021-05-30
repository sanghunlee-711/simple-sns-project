interface FollowState {
  followId: number;
}

type FollowAction = ReturnType<typeof sendFollow>;

export const types = {
  SEND_FOLLOW: "follow/SENDFOLLOW" as const,
};

export const sendFollow = (followId: number) => ({
  type: types.SEND_FOLLOW,
  payload: { followId },
});

export const actions = {
  sendFollow,
};

export const INITIAL_STATE: FollowState = {
  followId: 0,
};

export const followReducer = (
  state: FollowState = INITIAL_STATE,
  action: FollowAction
) => {
  switch (action.type) {
    case "follow/SENDFOLLOW":
      console.log("안함??");
      return {
        ...state,
        follwId: action.payload.followId,
      };
    default:
      return state;
  }
};
export default followReducer;
