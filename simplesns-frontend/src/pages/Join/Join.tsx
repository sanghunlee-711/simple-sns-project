import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import config from "../../config/config.json";

export default function Join() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckBool, setPwCheckBool] = useState<boolean>(false);
  const [nick, setNick] = useState("");

  useEffect(() => {
    pw.normalize() === pwCheck.normalize()
      ? setPwCheckBool(false)
      : setPwCheckBool(true);
  }, [pw, pwCheck]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id") {
      return setId(value);
    }

    if (name === "pw") {
      return setPw(value);
    }

    if (name === "pwCheck") {
      return setPwCheck(value);
    }

    if (name === "nick") {
      if (value.length >= 12) {
        return;
      } else {
        return setNick(value);
      }
    }
  };

  const doCheckNick = async () => {
    const url = `${config.BASE_URL}/auth/nickcheck`;
    const setting = {
      nick,
      withCredentials: true,
    };

    if (nick.length >= 11 || nick.length <= 1) {
      return alert("닉네임 조건을 맞춰주세요");
    }

    try {
      const response = await axios.post(url, setting);

      if (response.status === 200) {
        alert("사용하실 수 있는 닉네임 입니다 :)");
      } else if (response.status === 302) {
        alert(`${response.status} `);
      }
    } catch (error) {
      alert(`${error.message} 에러가 발생했습니다. `);
      console.error(error);
    }
  };

  const doJoin = async () => {
    const url = `${config.BASE_URL}/auth/join`;
    const setting = {
      email: id,
      nick,
      password: pw,
      withCredentials: true,
    };

    try {
      const response = await axios.post(url, setting);

      alert(`${response}`);

      if (response.status === 200) {
        history.push("/");
      } else if (response.status === 302) {
        alert(`${response.status} `);
      }
    } catch (error) {
      alert(`${error.message} 에러가 발생했습니다. `);
      console.error(error);
    }
  };

  return (
    <JoinWrapper>
      <h1>JOIN</h1>
      <InputWrapper>
        <InputBlock>
          <label>NickName</label>
          <input
            name="nick"
            value={nick}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />

          <NickCheckButton nick={nick} onClick={() => doCheckNick()}>
            {nick.length >= 11 ? "Under 12 length" : "Duplicate Check"}
          </NickCheckButton>
        </InputBlock>
        <InputBlock>
          <label>Email</label>
          <input name="id" value={id} onChange={(e) => handleInputChange(e)} />
        </InputBlock>
        <InputBlock>
          <label>PassWord</label>
          <input
            type="password"
            name="pw"
            value={pw}
            onChange={(e) => handleInputChange(e)}
          />
        </InputBlock>
        <InputBlock>
          <label>PW Check</label>
          <input
            type="password"
            name="pwCheck"
            value={pwCheck}
            onChange={(e) => handleInputChange(e)}
          />
          <PwCheckButton pwCheckBool={pwCheckBool}>
            Check Your Password
          </PwCheckButton>
        </InputBlock>
        <ButtonWrapper>
          <JoinButton onClick={() => doJoin()}>Join</JoinButton>
        </ButtonWrapper>
      </InputWrapper>
    </JoinWrapper>
  );
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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
`;

const CheckButton = styled.button`
  position: absolute;
  transition: all 0.5s ease-in-out;
  width: 10vw;
  height: 7vh;
  right: -13vw;
  top: 0vh;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 8px;
  &:hover {
    color: white;
    background-color: black;
  }
`;

const NickCheckButton = styled(CheckButton)<{ nick: string }>`
  visibility: ${({ nick }) => (nick.length >= 1 ? "visible" : "hidden")};
  opacity: ${({ nick }) => (nick.length >= 1 ? "1" : "0")};
`;

const PwCheckButton = styled(CheckButton)<{ pwCheckBool: boolean }>`
  visibility: ${({ pwCheckBool }) => (pwCheckBool ? "visible" : "hidden")};
  opacity: ${({ pwCheckBool }) => (pwCheckBool ? "1" : "0")};
`;

const JoinWrapper = styled.div`
  margin-top: 40vh;
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

const ButtonWrapper = styled.div`
  flex-direction: row;
  margin: 5vh 0;
`;

const JoinButton = styled.button`
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
`;
