import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BASE_URL } from "../../../config/config.json";
import { CommentsData } from "../../../model/ArticleModel";
import { actions } from "../../../redux/reducer/commentReducer";
import { config } from "../../../utils/util";

interface ICommentData {
  comments: CommentsData[];
}

export default function TuiViewerComment({ comments }: ICommentData) {
  const dispatch = useDispatch();
  const [changedComment, setChangedComment] = useState<string>("");
  const [changeToggle, setChangeToggle] = useState<boolean>(false);
  const [toggleId, setToggleId] = useState<number>(0);
  const [tokenCheck, setTokenCheck] = useState<boolean>(false);
  const [tokenNick, setTokenNick] = useState<string>("");
  const [tokenId, setTokenId] = useState<number>(0);

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
    <>
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
                {User.nick === tokenNick && User.id === tokenId && tokenCheck && (
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
    </>
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

const CommentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0vw 0.5vw;
`;

const CommentsWrapper = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
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
