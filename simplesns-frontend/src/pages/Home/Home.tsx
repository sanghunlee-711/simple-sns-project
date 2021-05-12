import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../../components/Post/Post";
import { BASE_URL } from "../../config/config.json";
import { RootState } from "../../redux/store";

export default function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const postToggle = useSelector((state: RootState) => state.navReducer.toggle);

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
      <PostContainer togglePost={postToggle}>
        <Post />
      </PostContainer>

      {data.map((el) => (
        <div>안녕</div>
      ))}
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  margin-top: 80px;
`;

const PostContainer = styled.div<{ togglePost: boolean }>`
  display: ${({ togglePost }) => (togglePost ? "static" : "none")};
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
`;

const PostButton = styled.button<{ togglePost: boolean }>`
  background-color: white;
  color: black;
  border: 1px solid black;
  width: 7vw;
  height: 4vh;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border-radius: 0.4vw;
  display: ${({ togglePost }) => (togglePost ? "none" : "static")};
`;
