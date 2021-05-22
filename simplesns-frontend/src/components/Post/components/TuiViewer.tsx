import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../../config/config.json";
import { CommentsData } from "../../../model/ArticleModel";
import { actions } from "../../../redux/reducer/commentReducer";
import { config } from "../../../utils/util";

interface ITuiViewer {
  id: number;
  content: string;
  title: string;
  titleImgUrl: string;
  comments: CommentsData[];
  nick: string;
}

export default function TuiViewer({
  content,
  title,
  titleImgUrl,
  id,
  comments,
  nick,
}: ITuiViewer) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputComment, setInputComment] = useState<string>("");
  const [changedComment, setChangedComment] = useState<string>("");
  const [changeToggle, setChangeToggle] = useState<boolean>(false);
  const [toggleId, setToggleId] = useState<number>(0);
  const [tokenCheck, setTokenCheck] = useState<boolean>(false);
  const [tokenNick, setTokenNick] = useState<string>("");
  const [tokenId, setTokenId] = useState<number>(0);

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

      console.log("delete REsponse!!!", response);
    } catch (error) {
      console.error(error);
      alert("Error:!");
    }

    console.log("id", _postId);
  };

  useEffect(() => {
    checkTokenForBtn();
  }, []);

  const checkTokenForBtn = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/token`, config);
      if (
        response.status === 200 &&
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("nick") === response.data._nick
      ) {
        setTokenNick(response.data._nick);
        setTokenId(response.data._id);
        setTokenCheck(true);
      } else {
        setTokenCheck(false);
      }
    } catch (error) {
      setTokenCheck(false);
      console.error(error);
    }
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
        <Id>{nick}</Id>
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
        {comments.map(({ comment, User, id }) => (
          <>
            {User.id === tokenId && changeToggle && id === toggleId ? (
              <ChangeCommentContainer>
                <CommentsWrapper>
                  <span>{User.nick}</span>
                  <input
                    autoFocus
                    value={changedComment}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setChangedComment(e.target.value);
                    }}
                  />
                </CommentsWrapper>

                <CommentsButtonWrapper>
                  <button
                    onClick={() => {
                      dispatch(actions.putCommentData(id, changedComment));
                    }}
                  >
                    <i className="fas fa-file-invoice"></i>
                  </button>
                  <button
                    onClick={() => {
                      setChangeToggle(false);
                    }}
                  >
                    <i className="fas fa-times-circle"></i>
                  </button>
                </CommentsButtonWrapper>
              </ChangeCommentContainer>
            ) : (
              <CommentsContainer key={User.id + "0" + id}>
                <CommentsWrapper>
                  <span>{User.nick}</span>
                  <span>{comment}</span>
                </CommentsWrapper>
                <CommentsButtonWrapper>
                  {User.nick === tokenNick &&
                    User.id === tokenId &&
                    tokenCheck && (
                      <>
                        <button
                          onClick={() => {
                            setToggleId(id);
                            setChangeToggle(true);
                            setChangedComment(comment);
                          }}
                        >
                          <i className="fas fa-edit "></i>
                        </button>
                        <button
                          onClick={() => {
                            dispatch(actions.deleteCommentData(id));
                          }}
                        >
                          <i className="fas fa-times "></i>
                        </button>
                      </>
                    )}
                </CommentsButtonWrapper>
              </CommentsContainer>
            )}
          </>
        ))}
      </ViewerBottom>
    </ViewerContainer>
  );
}

const ChangeCommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0vw 0.5vw;

  input {
    border: 1px solid white;
    border-radius: 8px;
    margin-left: 1vw;
    font-size: 1rem;
    font-family: "Newsreader", serif;
  }
`;

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
  padding: 0vw 0.5vw;
`;

const CommentsWrapper = styled.div`
  /* width: 85%; */
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* margin: 0 0.5vw; */
  span {
    line-height: 2;
    &:first-child {
      font-size: 1rem;
      font-family: "Newsreader", serif;
      font-weight: bolder;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &:last-child {
      margin-left: 1vw;
      font-size: 1rem;
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
