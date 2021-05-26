import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../../config/config.json";
import { CommentsData, UserData } from "../../../model/ArticleModel";
import { actions } from "../../../redux/reducer/commentReducer";
import { actions as postActions } from "../../../redux/reducer/postReducer";
import { RootState } from "../../../redux/store";
import { config } from "../../../utils/util";
import TuiViewerComment from "./TuiViewerComment";

interface ITuiViewer {
  id: number;
  content: string;
  title: string;
  titleImgUrl: string;
  comments: CommentsData[];
  nick: string;
  User: UserData;
}

export default function TuiViewer({
  content,
  User,
  title,
  titleImgUrl,
  id,
  comments,
  nick,
}: ITuiViewer) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputComment, setInputComment] = useState<string>("");
  const tokenCheckData = useSelector((state: RootState) => state.postReducer);
  const { userId, userNick, tokenCheck } = tokenCheckData;

  const deletePost = async () => {
    const _postId = id;

    if (!_postId) {
      return alert("게시글이 존재하지 않습니다.");
    }

    try {
      const response = await axios.delete(
        `${BASE_URL}/post/delete/${_postId}`,
        config
      );

      if (response.status === 200) {
        history.push("/");
        return window.location.reload();
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error:!");
    }
  };

  return (
    <ViewerContainer>
      <ViewerHeader>
        <Title>{title}</Title>
        <HeaderButtonWrapper>
          {userNick === User.nick && tokenCheck && userId === User.id ? (
            <>
              <EditButton
                onClick={() => {
                  dispatch(postActions.getPostId(id));
                  history.push("/modify");
                }}
              >
                <i className="fas fa-edit fa-2x"></i>
              </EditButton>
              <QuitButton onClick={() => deletePost()}>
                <i className="fas fa-times fa-2x"></i>
              </QuitButton>
            </>
          ) : (
            <></>
          )}
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
        <Id>{User.nick}</Id> <HashTagContainer></HashTagContainer>
        <InputWrapper>
          <input
            type="text"
            value={inputComment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputComment(e.target.value);
            }}
          />
          <CommentButton
            onClick={() => {
              dispatch(actions.postCommentData(id, inputComment));
            }}
          >
            <i className="far fa-comment fa-2x"></i>
          </CommentButton>
        </InputWrapper>
        <>
          <TuiViewerComment comments={comments} />
        </>
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

const HashTagContainer = styled.div`
  display: flex;
`;
