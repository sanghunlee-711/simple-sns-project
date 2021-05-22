import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";

interface AritcleInfo {
  title: string;
  titleImgUrl: string;
  content: string;
  createdAt: string;
}
interface UserInfo {
  email: string;
  nick: string;
  id: number;
}

export default function Article() {
  let { id } = useParams<{ id: string }>();
  const [articleData, setArticleData] = useState<
    AritcleInfo | Record<string, string>
  >({});
  const [userData, setUserData] = useState<UserInfo | Record<string, string>>(
    {}
  );
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
      console.log(response.data);
      setArticleData(response.data);
      setUserData(response.data.User);
      // setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { title, content } = articleData;
  const { email, nick } = userData;

  return (
    <ArticleContainer>
      <HeaderWrapper>
        <Title>{title}</Title>
        <UserInfoWrapper>
          <p>
            Email Is <span>{email}</span>{" "}
          </p>
          <p>
            Written By<span>{nick}</span>
          </p>
        </UserInfoWrapper>
      </HeaderWrapper>
      <ViewerWrapper
        dangerouslySetInnerHTML={{ __html: content }}
      ></ViewerWrapper>

      <InputWrapper>
        <input type="text" />
        <CommentButton>
          <i className="far fa-comment fa-2x"></i>
        </CommentButton>
      </InputWrapper>
      <CommentsContainer>
        <CommentsWrapper>
          <span>dltkdgnszlzl@naver.com</span>
          <span>commentscommentscommentscomments</span>
        </CommentsWrapper>
        <CommentsButtonWrapper>
          <button>
            <i className="fas fa-edit "></i>
          </button>
          <button>
            <i className="fas fa-times "></i>
          </button>
        </CommentsButtonWrapper>
      </CommentsContainer>
    </ArticleContainer>
  );
}

const ArticleContainer = styled.section`
  margin: 20vh auto 70px auto;
  width: 80%;
  font-family: "Newsreader", serif;
`;

const ViewerWrapper = styled.div`
  padding: 1vw;
  display: block;
  overflow: scroll;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  height: 100%;
  font-size: 1.2rem;
  img {
    width: 100%;
    height: 100%;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2vh;
  padding-bottom: 2vh;
  height: 100%;
  border-top: 2px solid black;
`;

const CommentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentsWrapper = styled.div`
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 1vw 0 1vw 0.5vw;
  span {
    &:first-child {
      font-size: 1.2rem;
      font-family: "Newsreader", serif;
      font-weight: bolder;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &:last-child {
      margin-left: 1vw;
      font-size: 1.2rem;
      font-family: "Newsreader", serif;
    }
  }
`;

const CommentsButtonWrapper = styled.div`
  button {
    background-color: white;
    border: none;

    &:hover {
      color: gray;
      transition: all 0.3s ease-in-out;
    }
  }
`;

const CommentButton = styled.button`
  background-color: white;
  border: none;

  &:hover {
    color: gray;
    transition: all 0.3s ease-in-out;
  }
`;
const Title = styled.span`
  font-size: 3rem;
  font-family: "Newsreader", serif;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1vh 0;
  justify-content: space-between;
  align-items: center;
  input {
    margin-left: 0.5vw;
    height: 4vh;
    width: 90%;
    border-radius: 8px;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  p {
    font-weight: bold;
    span {
      margin-left: 1vw;
      font-weight: normal;
      &:hover {
        color: red;
      }
    }
  }
`;
