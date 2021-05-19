import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import TuiViewer from "../../components/Post/components/TuiViewer";
import TuiPost from "../../components/Post/TuiPost";
import { BASE_URL } from "../../config/config.json";
import { RootState } from "../../redux/store";

interface contentsData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const [data, setData] = useState<contentsData[]>([]);
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
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomeContainer>
      <PostContainer togglePost={postToggle}>
        <TuiPost />
      </PostContainer>

      {data.map(({ content, id }) => (
        <TuiViewer content={content} />
      ))}
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  margin-top: 70px;
`;

const PostContainer = styled.div<{ togglePost: boolean }>`
  display: ${({ togglePost }) => (togglePost ? "static" : "none")};
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
  height: 100%;
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
