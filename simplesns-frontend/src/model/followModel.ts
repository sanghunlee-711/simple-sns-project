export interface FollowData {
  id: number;
  email: string;
  nick: string;
}

export interface FollowList {
  Followers: FollowData[]; // 해당 유저'를' 팔로우하고 있는 리스트
  Followings: FollowData[]; //해당 유저가 팔로우하고 있는 리스트
}
