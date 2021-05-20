import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL, CLIENT_SECRET } from "../../../config/config.json";

interface ITuiViewer {
  id: number;
  content: string;
  title: string;
  titleImgUrl: string;
}

export default function TuiViewer({
  content,
  title,
  titleImgUrl,
  id,
}: ITuiViewer) {
  const history = useHistory();
  const [inputComment, setInputComment] = useState<string>("");

  const deletePost = async () => {
    const _postId = id;

    if (!_postId) {
      return alert("게시글이 존재하지 않습니다.");
    }

    try {
      const config = {
        headers: {
          authorization: sessionStorage.getItem("token"),
          key: CLIENT_SECRET,
        },
      };
      const response = await axios.delete(
        `${BASE_URL}/post/delete/${_postId}`,
        config
      );

      if (response.status === 200) {
        history.push("/");
        return window.location.reload();
      }

      console.log("delete REsponse!!!", response);
    } catch (error) {
      console.error(error);
      alert("Error:!");
    }

    console.log("id", _postId);
  };

  const addComment = async () => {
    const _postId = id;

    if (!_postId) {
      return alert("게시글이 존재하지 않습니다.");
    }

    try {
      const config = {
        headers: {
          authorization: sessionStorage.getItem("token"),
          key: CLIENT_SECRET,
        },
      };

      const response = await axios.post(
        `${BASE_URL}/comment`,
        {
          postId: _postId,
          comment: inputComment,
        },
        config
      );

      if (response.status === 200) {
        history.push("/");
        return window.location.reload();
      }

      console.log("delete REsponse!!!", response);
    } catch (error) {
      console.error(error);
      alert("Error:!");
    }

    console.log("id", _postId);
  };

  return (
    <ViewerContainer>
      <ViewerHeader>
        <Title>{title}</Title>
        <HeaderButtonWrapper>
          <EditButton>
            <i className="fas fa-edit fa-2x"></i>
          </EditButton>
          <QuitButton onClick={() => deletePost()}>
            <i className="fas fa-times fa-2x"></i>
          </QuitButton>
        </HeaderButtonWrapper>
      </ViewerHeader>
      <ViewerMainImageWrapper
        onClick={() => {
          history.push(`/article/${id}`);
        }}
      >
        <ViewerMainImage src={titleImgUrl} alt="represent image" />
      </ViewerMainImageWrapper>
      <ViewerBottom>
        <Id>호읍읍</Id>
        <InputWrapper>
          <input
            type="text"
            value={inputComment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputComment(e.target.value)
            }
          />
          <CommentButton onClick={() => addComment()}>
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
      </ViewerBottom>
    </ViewerContainer>
  );
}

const ViewerContainer = styled.article`
  width: 33.333%;
  margin: 5vh;
  border: 1px solid black;
  border-radius: 2px;
  height: 100%;
`;

const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw;
`;

const ViewerMainImageWrapper = styled.div`
  min-height: 30vh;
`;

const ViewerMainImage = styled.img`
  object-fit: scale-down;
  width: 100%;
`;

const ViewerBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.span`
  color: black;
  font-size: 20px;
  font-family: "Newsreader", serif;
`;

const Id = styled.div`
  color: black;
  font-size: 16px;
  font-family: "Newsreader", serif;
  font-weight: bold;
  margin-left: 0.5vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
`;

const HeaderButtonWrapper = styled.div``;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 1vh 0;
  align-items: center;
  input {
    margin-left: 0.5vw;
    height: 4vh;
    width: 90%;
    border-radius: 8px;
  }
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

const QuitButton = styled.button`
  background-color: white;
  border: none;

  &:hover {
    color: gray;
    transition: all 0.3s ease-in-out;
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

const EditButton = styled.button`
  background-color: white;
  border: none;

  &:hover {
    color: gray;
    transition: all 0.3s ease-in-out;
  }
`;
