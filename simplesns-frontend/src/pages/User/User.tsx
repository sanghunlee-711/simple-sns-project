import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actions as FollowActions } from "../../redux/reducer/followReducer";

interface FollowData {
  id: number;
  email: string;
  nick: string;
}

interface FollowList {
  Followers: FollowData[]; // 해당 유저'를' 팔로우하고 있는 리스트
  Followings: FollowData[]; //해당 유저가 팔로우하고 있는 리스트
}

export default function User() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FollowActions.getFollowData());
  }, []);

  return <HomeContainer>UserPage!</HomeContainer>;
}

const HomeContainer = styled.main`
  margin: 70px auto 0px auto;
  width: 80%;
  min-height: 100vh;
`;
