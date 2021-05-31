import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../../config/config.json";
import { toggleBurger } from "../../../redux/reducer/navReducer";
import { RootState } from "../../../redux/store";

export default function BurgerNav(): JSX.Element {
  const token = sessionStorage.getItem("token");
  const burgerToggle = useSelector(
    (state: RootState) => state.navReducer.burgerToggle
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogOut = async (): Promise<void> => {
    if (sessionStorage.getItem("token")) {
      const url = `${BASE_URL}/auth/logout`;
      const response = await axios.get(url, {
        headers: {
          authorization: sessionStorage.getItem("token"),
          key: process.env.CLIENT_SECRET,
        },
      });

      if (response.status === 200) {
        sessionStorage.removeItem("nick");
        sessionStorage.removeItem("token");
        alert("로그아웃 완료");
        window.location.reload();
        return history.push("/");
      } else {
        alert("로그인 상태가 아닙니다.");
      }
    } else {
      alert("로그인 상태가 아닙니다.");
    }
  };

  return (
    <BurgetNavContainer>
      <QuitButton
        onClick={() => {
          dispatch(toggleBurger(!burgerToggle));
        }}
      >
        <i className="fas fa-times fa-2x"></i>
      </QuitButton>
      <ProfileContainer>
        <ProfileWrapper
          onClick={() => {
            if (sessionStorage.getItem("token")) {
              console.log("/...?");
              history.push("/user");
            }
          }}
        >
          <ProfileImage />
          <div>
            <span>안녕하세요!</span>
            &nbsp;
            <span>{sessionStorage.getItem("nick")}님</span>
          </div>
          <div>
            <div>
              <span>팔로잉</span>
              <span>100명</span>
            </div>
            <div>
              <span>팔로워</span>
              <span>120명</span>
            </div>
          </div>
        </ProfileWrapper>
        <ButtonWrapper>
          <Button
            onClick={
              token
                ? () => doLogOut()
                : () => {
                    history.push("/login");
                    dispatch(toggleBurger(!burgerToggle));
                  }
            }
          >
            {token ? "LOGOUT" : "LOGIN"}
          </Button>
          <Button
            onClick={() => {
              history.push("/join");
              dispatch(toggleBurger(!burgerToggle));
            }}
          >
            Join
          </Button>
        </ButtonWrapper>
      </ProfileContainer>
    </BurgetNavContainer>
  );
}

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 20px 0;
  background-color: black;
`;

const BurgetNavContainer = styled.nav`
  display: "flex";
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 490px;
  height: 100%;
  background-color: white;
  z-index: 10;
  border-left: 1px solid gray;
`;

const Button = styled.button`
  border: 1px solid black;
  height: 60px;
  width: 160px;
  background-color: white;
  border: 1px solid black;
  transition: all 0.5s ease-in-out;
  font-size: 20px;

  &:hover {
    background-color: black;
    border: 1px solid black;
    color: white;
  }
`;

const QuitButton = styled.button`
  background-color: white;
  border: none;
  position: absolute;
  right: 30px;
  top: 30px;

  &:hover {
    color: gray;
    transition: all 0.3s ease-in-out;
  }
`;

const ProfileContainer = styled.section`
  width: 80%;
  margin: 4vw auto;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: calc(490px * 0.8);
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: calc(490px * 0.8);
  margin: 3vw 0;
`;
