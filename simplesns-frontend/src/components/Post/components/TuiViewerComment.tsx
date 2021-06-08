import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "codemirror/lib/codemirror.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CommentsData } from "../../../model/ArticleModel";
import { actions } from "../../../redux/reducer/commentReducer";
import { actions as postActions } from "../../../redux/reducer/postReducer";
import { RootState } from "../../../redux/store";

interface ICommentData {
  comments: CommentsData[];
}

export default function TuiViewerComment({ comments }: ICommentData) {
  const dispatch = useDispatch();
  const [changedComment, setChangedComment] = useState<string>("");
  const [changeToggle, setChangeToggle] = useState<boolean>(false);
  const [toggleId, setToggleId] = useState<number>(0);
  const tokenCheckData = useSelector((state: RootState) => state.postReducer);
  const { userId, userNick, tokenCheck } = tokenCheckData;
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      dispatch(postActions.checkTokenData());
    }
  }, []);

  return (
    <>
      {comments.map(({ comment, User, id }, index) => (
        <>
          {User.id === userId && changeToggle && id === toggleId ? (
            <ChangeCommentContainer key={User.nick + id + index}>
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
                {User.nick === userNick && User.id === userId && tokenCheck && (
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
