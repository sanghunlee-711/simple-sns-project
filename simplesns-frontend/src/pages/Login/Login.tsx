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
    if (response.data.code !== 200) {
      return alert(`${response.data.code} 에러가 발생했습니다.`);
    }
    console.log(response);
    const { token, nick } = response.data;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("nick", nick);

    if (sessionStorage.getItem("nick")) {
      alert("로그인이 완료 되었습니다 :)");
      return history.push("/");
    }
  };

  return (
    <CompoentWrapper>
      <h1>Login</h1>
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
