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
    const { token, nick, userId } = response.data;
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("nick", nick);
    sessionStorage.setItem("userId", userId);

    if (sessionStorage.getItem("nick")) {
      alert("로그인이 완료 되었습니다 :)");
      return history.push("/");
    }
  };

  return (
    <CompoentWrapper>
      <h1>Login</h1>
      <InputWrapper>
        <div>
          <label>ID</label>
          <input name="id" value={id} onChange={(e) => handleInputChange(e)} />
        </div>
        <div>
          <label>PW</label>
          <input
            type="password"
            name="pw"
            value={pw}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </InputWrapper>
      <ButtonWrapper>
        <button name="login" onClick={() => doLogin()}>
          DO LOGIN
        </button>
        <button name="join" onClick={() => history.push("/join")}>
          GO JOIN
        </button>
      </ButtonWrapper>
    </CompoentWrapper>
  );
}

const CompoentWrapper = styled.div`
  width: calc(80vw -70px);
  height: 100vh;
  background-color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: "Newsreader", serif;
    font-size: 5rem;
    margin: 10vh 0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Newsreader", serif;

  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 2vh 0;
    label {
      font-size: 2.7rem;
      font-weight: bolder;
    }
    input {
      margin-left: 3vw;
      width: 30vw;
      height: 6vh;
      font-family: "Newsreader", serif;
      font-size: 2rem;
    }
  }
`;

const ButtonWrapper = styled(InputWrapper)`
  flex-direction: row;
  margin: 5vh 0;
  button {
    margin: 0 1vw;
    background-color: white;
    border: 1.5px solid black;
    color: black;
    border-radius: 2px;
    transition: all 0.5s ease-in-out;
    /* max-width: 40px;
    max-height: 32px; */
    width: 18vw;
    height: 8vh;
    font-size: 2rem;
    font-weight: bolder;
    font-family: "Newsreader", serif;

    &:hover {
      color: white;
      background-color: black;
    }
  }
`;
