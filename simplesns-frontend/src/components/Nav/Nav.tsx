import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";

export default function Nav() {
  const [nick, setNick] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  useEffect(() => {
    setNick(sessionStorage.getItem("nick") as string);
  }, [token]);

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

    return history.push("/");
  };

  return (
    <NavWrapper>
      <div>
        <span>This is Nav</span>
        <span>{nick ? nick : "You"}</span>
        <span onClick={token ? () => doLogOut() : () => history.push("/login")}>
          {token ? "Logout" : "Login"}
        </span>
      </div>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  border-bottom: 1px solid black;
  width: 70px;
`;
