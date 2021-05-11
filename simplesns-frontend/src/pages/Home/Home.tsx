import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../../components/Post/Post";
import { BASE_URL } from "../../config/config.json";

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          authorization: sessionStorage.getItem("token"),
          key: process.env.CLIENT_SECRET,
        }, //API 요청
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomeContainer>
      <div>This is Home Comp.</div>
      {data.map((el) => (
        <div>안녕</div>
      ))}
      <Post />
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  margin-top: 80px;
`;
