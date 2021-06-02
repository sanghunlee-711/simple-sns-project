import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { getFollowData } from "../../redux/reducer/followReducer";
import { RootState } from "../../redux/store";
import UserCard from "./components/UserCard";
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
  const { userId } = useParams<{ userId: string }>();
  const userData: FollowList = useSelector(
    (state: RootState) => state.followReducer.followData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hello", userId);
    dispatch(getFollowData());
  }, []);

  return (
    <HomeContainer
      onClick={() => {
        console.log(userData);
      }}
    >
      <HomeWrapper>
        <FollowersContainer>
          {userData?.Followers?.map(({ id, email, nick }) => (
            <UserCard userId={String(id)} email={email} nick={nick} />
          ))}
        </FollowersContainer>
        <FollowingContainer>
          {userData?.Followings?.length <= 0 ? (
            <div>아무도 팔로잉 하지 않네</div>
          ) : (
            userData?.Followings?.map(({ id, email, nick }) => (
              <UserCard userId={String(id)} email={email} nick={nick} />
            ))
          )}
        </FollowingContainer>
      </HomeWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  margin: 90px auto 0px auto;
  width: 80%;
  min-height: 100vh;
`;

const HomeWrapper = styled.div`
  display: flex;
`;

const FollowersContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FollowingContainer = styled(FollowersContainer)``;