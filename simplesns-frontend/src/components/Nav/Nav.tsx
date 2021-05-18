import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";
import { togglePost } from "../../redux/reducer/navReducer";

export default function Nav() {
  const [nick, setNick] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  const [buggerToggle, setBurgerToggle] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setNick(sessionStorage.getItem("nick") as string);
  }, []);

  const doLogOut = async (): Promise<void> => {
    if (sessionStorage.getItem("token")) {
      const url = `${BASE_URL}/auth/logout`;
      const response = await axios.get(url, {
        headers: {
          authorization: sessionStorage.getItem("token"),
          key: process.env.CLIENT_SECRET,
        }, //API 요청
      });

      console.log(response.status);
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
    <>
      <NavContainer>
        <NavWrapper>
          <Logo onClick={() => history.push("/")}>Simple SNS</Logo>
          <NavButtonWrapper>
            <PostButton onClick={() => dispatch(togglePost(true))}>
              Post
            </PostButton>
            <BurgerButtonWrapper onClick={() => setBurgerToggle(!buggerToggle)}>
              <i className="fas fa-bars fa-2x"></i>
            </BurgerButtonWrapper>
          </NavButtonWrapper>
        </NavWrapper>
      </NavContainer>
      <BurgetNavContainer show={buggerToggle}>
        <QuitButton onClick={() => setBurgerToggle(!buggerToggle)}>
          <i className="fas fa-times fa-2x"></i>
        </QuitButton>
        <ProfileContainer>
          <ProfileWrapper>
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
                      setBurgerToggle(!buggerToggle);
                    }
              }
            >
              {token ? "LOGOUT" : "LOGIN"}
            </Button>
            <Button
              onClick={() => {
                history.push("/join");
                setBurgerToggle(!buggerToggle);
              }}
            >
              Join
            </Button>
          </ButtonWrapper>
        </ProfileContainer>
      </BurgetNavContainer>
    </>
  );
}

const NavButtonWrapper = styled.div`
  display: flex;
  width: fit-content;
  button {
    margin-right: 3vw;
  }
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 20px 0;
  background-color: black;
`;

const BurgerButtonWrapper = styled.div``;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: auto;
`;

const NavContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  min-height: 70px;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in-out;
  font-family: "Newsreader", serif;

  &:hover {
    animation: animationForBorder 3s infinite;

    @keyframes animationForBorder {
      0% {
        opacity: 1;
        border-bottom: 1px solid black;
      }
      50% {
        opacity: 1;
        border-bottom: 1px solid white;
      }
      100% {
        opacity: 1;
        border-bottom: 1px solid black;
      }
    }
  }
`;

const BurgetNavContainer = styled.nav<{ show: boolean }>`
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 490px;
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

const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const ProfileContainer = styled.section`
  width: 80%;
  margin-top: 4vw;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: calc(490px * 0.8);
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: calc(490px * 0.8);
  margin: 3vw 0;
`;

const PostButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  width: 7vw;
  height: 4vh;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border-radius: 0.4vw;
  display: static;
`;
