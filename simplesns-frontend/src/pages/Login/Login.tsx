import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";

export default function Login() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [userInfo, setUserInfo] = useState({ nick: "", id: "", provider: "" });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id") {
      return setId(value);
    }

    if (name === "pw") {
      return setPw(value);
    }
  };

  const doLogin = async (): Promise<void> => {
    const url = `${BASE_URL}/auth/login`;
    const setting = {
      email: id,
      password: pw,
      withCredentials: true,
    };
    const response = await axios.post(url, setting);
    console.log(response);
    const { token, nick, email } = response.data;
    // setUserInfo({
    //   nick,
    //   id: email,
    //   provider,
    // });
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("nick", nick);

    return;
  };

  const doLogOut = async (): Promise<void> => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
      const url = `${BASE_URL}/auth/logout`;
      const setting = {
        email: sessionStorage.getItem("is"),
        password: sessionStorage.getItem("token"),
        withCredentials: true,
      };
      const response = await axios.get(url);
      console.log(response);
    } else {
      alert("로그인 상태가 아닙니다.");
    }

    return history.push("/");
  };

  return (
    <CompoentWrapper>
      <h1>Login</h1>
      {/* {userInfo.nick.length > 1 ? (
        <div>
          <span>{userInfo.nick}</span>
          <span>{userInfo.provider}</span>
          <span>{userInfo.id}</span>
        </div>
      ) : (
        ""
      )} */}
      <InputWrapper>
        <input name="id" value={id} onChange={(e) => handleInputChange(e)} />
        <input
          type="password"
          name="pw"
          value={pw}
          onChange={(e) => handleInputChange(e)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <button name="login" onClick={() => doLogin()}>
          로그인
        </button>
        <button name="join" onClick={() => history.push("/join")}>
          회원가입
        </button>
        <button name="join" onClick={() => doLogOut()}>
          로그아웃
        </button>
      </ButtonWrapper>
    </CompoentWrapper>
  );
}

const CompoentWrapper = styled.div`
  width: 80vw;
  height: 80vh;
  background-color: wheat;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 40px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled(InputWrapper)`
  flex-direction: row;
`;
