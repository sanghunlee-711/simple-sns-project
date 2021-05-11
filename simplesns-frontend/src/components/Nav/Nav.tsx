import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";

export default function Nav() {
  const [nick, setNick] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  const [buggerToggle, setBurgerToggle] = useState<boolean>(false);
  useEffect(() => {
    setNick(sessionStorage.getItem("nick") as string);
  }, []);

  const doLogOut = async (): Promise<void> => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nick");

      const url = `${BASE_URL}/auth/logout`;
      const response = await axios.get(url);
      console.log(response);
    } else {
      alert("로그인 상태가 아닙니다.");
    }
    window.location.reload();
    return history.push("/");
  };

  return (
    <>
      <NavContainer>
        <NavWrapper>
          <Logo onClick={() => history.push("/")}>Simple SNS</Logo>
          <BurgerButtonWrapper onClick={() => setBurgerToggle(!buggerToggle)}>
            <i className="fas fa-bars fa-2x"></i>
          </BurgerButtonWrapper>
        </NavWrapper>
      </NavContainer>
      <BurgetNavContainer show={buggerToggle}>
        <QuitButton onClick={() => setBurgerToggle(!buggerToggle)}>
          <i className="fas fa-times fa-2x"></i>
        </QuitButton>
        <ProfileWrapper>
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
              Login
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
        </ProfileWrapper>
      </BurgetNavContainer>
    </>
  );
}

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
  justify-content: center;
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

const ProfileWrapper = styled.section``;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: calc(490px * 0.8);
`;