import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { getFollowData, sendFollow } from "../../redux/reducer/followReducer";
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
  const history = useHistory();
  const userData: FollowList = useSelector(
    (state: RootState) => state.followReducer.followData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hello", userId);
    if (userId) {
      dispatch(getFollowData(userId));
    }

    if (sessionStorage.getItem("userId") === undefined) {
      return history.push("/");
    }
  }, []);

  const handleFollow = () => {
    dispatch(sendFollow(Number(userId)));
  };

  return (
    <HomeContainer
      onClick={() => {
        console.log(userData);
      }}
    >
      <HomeWrapper>
        {Number(sessionStorage.getItem("userId")) !== Number(userId) &&
        userId !== "my" ? (
          <FollowButtonWrapper>
            <button
              onClick={() => {
                handleFollow();
              }}
            >
              얘를 팔로우 하자
            </button>
          </FollowButtonWrapper>
        ) : (
          ""
        )}

        <FollowersContainer>
          {userData?.Followers.length <= 0 ? (
            <div>나를 아무도 팔로우 하지 않네</div>
          ) : (
            userData?.Followers?.map(({ id, email, nick }) => (
              <UserCard
                userId={String(id)}
                email={email}
                nick={nick}
                delimiter={"Followers"}
              />
            ))
          )}
        </FollowersContainer>
        <FollowingContainer>
          {userData?.Followings?.length <= 0 ? (
            <div>아무도 내가 팔로잉 하지 않네</div>
          ) : (
            userData?.Followings?.map(({ id, email, nick }) => (
              <UserCard
                userId={String(id)}
                email={email}
                nick={nick}
                delimiter={"Followings"}
              />
            ))
          )}
        </FollowingContainer>
      </HomeWrapper>
    </HomeContainer>
  );
}

const FollowButtonWrapper = styled.div``;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 10px auto;
`;
