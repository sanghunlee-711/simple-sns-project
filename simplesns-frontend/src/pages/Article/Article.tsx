import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";

export default function Article() {
  let { id } = useParams<{ id: string }>();

  //params를 통해 해당하는 post의 id를 받고 각 게시글만 띄워줄거

  const getData = async () => {
    const url = `${BASE_URL}/post/${id}`;
    const setting = {
      headers: {
        authorization: sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : "",
        key: process.env.CLIENT_SECRET,
      }, //API 요청
    };

    try {
      const response = await axios.get(url, setting);
      console.log(response);
      // setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ArticleContainer>
      <div>여기는 {id}Aritcle</div>
    </ArticleContainer>
  );
}

const ArticleContainer = styled.section`
  margin-top: 70px;
`;
