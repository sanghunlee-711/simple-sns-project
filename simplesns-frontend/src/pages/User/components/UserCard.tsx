import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { sendUnFollow } from "../../../redux/reducer/followReducer";

interface IUserCard {
  userId: string;
  nick: string;
  email: string;
  delimiter: "Followers" | "Followings";
}

export default function UserCard({
  userId,
  email,
  nick,
  delimiter,
}: IUserCard) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.target as HTMLButtonElement;
    console.log("UNFOLLOW WORK?");
    dispatch(sendUnFollow(Number(userId)));
  };

  const buttonCreator = (delimiter: string) => {
    if (delimiter === "Followers") {
      return;
    }

    if (delimiter === "Followings") {
      return (
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleFollow(e)}
          name="Followings"
        >
          팔로우 끊기
        </button>
      );
    }
  };

  return (
    <UserCardContainer>
      {delimiter}
      <span
        onClick={() => {
          history.push(`/user/${userId}`);
          window.location.reload();
        }}
      >
        {nick}
      </span>
      {email}
      <ButtonContainer>{buttonCreator(delimiter)}</ButtonContainer>
    </UserCardContainer>
  );
}

const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  min-height: 60px;
  border: 1px solid black;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  margin: 10px auto;
`;
