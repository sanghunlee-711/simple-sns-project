import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

interface IUserCard {
  userId: string;
  nick: string;
  email: string;
}

export default function UserCard({ userId, email, nick }: IUserCard) {
  const history = useHistory();
  return (
    <UserCardContainer onClick={() => history.push(`/person/${userId}`)}>
      안녕
      {userId}
      {nick}
      {email}
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
