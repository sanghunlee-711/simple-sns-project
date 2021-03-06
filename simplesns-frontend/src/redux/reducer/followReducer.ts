import { FollowList } from "../../model/followModel";
interface FollowState {
  followId: number;
  unFollowId: number;
  followData: FollowList;
  userId: string;
}

type FollowAction =
  | ReturnType<typeof sendFollow>
  | ReturnType<typeof getFollowData>
  | ReturnType<typeof saveFollowData>
  | ReturnType<typeof sendUnFollow>;

export const types = {
  SEND_FOLLOW: "follow/SEND_FOLLOW" as const,
  GET_FOLLOW_DATA: "follow/GET_FOLLOW_DATA" as const,
  SAVE_FOLLOW_DATA: "follow/SAVE_FOLLOW_DATA" as const,
  SEND_UNFOLLOW: "follow/SEND_UNFOLLOW" as const,
};

export const sendUnFollow = (unfollowId: number) => ({
  type: types.SEND_UNFOLLOW,
  payload: { unfollowId },
});

export const sendFollow = (followId: number) => ({
  type: types.SEND_FOLLOW,
  payload: { followId },
});

export const getFollowData = (userId: string) => ({
  type: types.GET_FOLLOW_DATA,
  payload: { userId },
});

export const saveFollowData = (data: FollowList) => ({
  type: types.SAVE_FOLLOW_DATA,
  payload: data,
});

export const actions = {
  sendFollow,
  sendUnFollow,
  getFollowData,
  saveFollowData,
};

export const INITIAL_STATE: FollowState = {
  followId: 0,
  unFollowId: 0,
  followData: { Followers: [], Followings: [] },
  userId: "0",
};

export const followReducer = (
  state: FollowState = INITIAL_STATE,
  action: FollowAction
) => {
  switch (action.type) {
    case "follow/SEND_FOLLOW":
      return {
        ...state,
        follwId: action.payload.followId,
      };
    case "follow/GET_FOLLOW_DATA":
      return { ...state, userId: action.payload.userId };

    case "follow/SAVE_FOLLOW_DATA":
      return { ...state, followData: action.payload };

    case "follow/SEND_UNFOLLOW":
      return { ...state, unFollowId: action.payload.unfollowId };

    default:
      return state;
  }
};
export default followReducer;
