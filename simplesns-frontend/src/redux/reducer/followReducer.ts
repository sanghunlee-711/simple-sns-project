import { FollowList } from "../../model/followModel";
interface FollowState {
  followId: number;
  followData: FollowList;
}

type FollowAction =
  | ReturnType<typeof sendFollow>
  | ReturnType<typeof getFollowData>
  | ReturnType<typeof saveFollowData>;

export const types = {
  SEND_FOLLOW: "follow/SEND_FOLLOW" as const,
  GET_FOLLOW_DATA: "follow/GET_FOLLOW_DATA" as const,
  SAVE_FOLLOW_DATA: "follow/SAVE_FOLLOW_DATA" as const,
};

export const sendFollow = (followId: number) => ({
  type: types.SEND_FOLLOW,
  payload: { followId },
});

export const getFollowData = () => ({
  type: types.GET_FOLLOW_DATA,
});

export const saveFollowData = (data: FollowList) => ({
  type: types.SAVE_FOLLOW_DATA,
  payload: data,
});

export const actions = {
  sendFollow,
  getFollowData,
  saveFollowData,
};

export const INITIAL_STATE: FollowState = {
  followId: 0,
  followData: { Followers: [], Followings: [] },
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

    case "follow/SAVE_FOLLOW_DATA":
      return { ...state, followData: action.payload };

    default:
      return state;
  }
};
export default followReducer;
