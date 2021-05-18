import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import config from "../../config/config.json";

export default function Join() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nick, setNick] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "id") {
      return setId(value);
    }

    if (name === "pw") {
      return setPw(value);
    }

    if (name === "nick") {
      return setNick(value);
    }
  };

  const doJoin = async () => {
    const url = `${config.BASE_URL}/auth/join`;

    console.log(url);
    const setting = {
      email: id,
      nick,
      password: pw,
      withCredentials: true,
    };

    try {
      const response = await axios.post(url, setting);

      console.log(response);
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
      <h1>회원가입 페이지 :)</h1>

      <InputWrapper>
        <InputBlock>
          <span>id</span>
          <input name="id" value={id} onChange={(e) => handleInputChange(e)} />
        </InputBlock>
        <InputBlock>
          <span>pw</span>
          <input
            type="password"
            name="pw"
            value={pw}
            onChange={(e) => handleInputChange(e)}
          />
        </InputBlock>

        <InputBlock>
          <span>nick</span>
          <input
            name="nick"
            value={nick}
            onChange={(e) => handleInputChange(e)}
          />
        </InputBlock>
        <button onClick={() => doJoin()}>Join</button>
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
  display: flex;
`;

const JoinWrapper = styled.div`
  margin-top: 40vh;
`;
