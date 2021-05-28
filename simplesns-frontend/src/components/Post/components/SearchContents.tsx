import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CommentsData, UserData } from "../../../model/ArticleModel";

interface SearchContentsProps {
  title: string;
  User: UserData;
  Comments: CommentsData[];
  titleImgUrl: string;
  id: number;
}

export default function SearchContents({
  title,
  User,
  Comments,
  titleImgUrl,
  id,
}: SearchContentsProps) {
  const [hoverTitle, setHoverTitle] = useState<boolean>(false);
  const history = useHistory();

  return (
    <SearchArticle
      titleImg={titleImgUrl}
      onClick={() => history.push(`/article/${id}`)}
      hoverTitle={hoverTitle}
      onMouseOver={() => setHoverTitle(true)}
      onMouseLeave={() => setHoverTitle(false)}
    >
      <TitleWrapper hoverTitle={hoverTitle}>
        <TitleAndUserWrapper>
          <span>{title}</span>
          <span>by {User.nick}</span>
        </TitleAndUserWrapper>
        <CommentCountWrapper>
          <i className="far fa-comments"></i>
          <span>{Comments?.length}</span>
        </CommentCountWrapper>
      </TitleWrapper>
    </SearchArticle>
  );
}

const CommentCountWrapper = styled.div`
  transition: all 0.5s ease-in-out;
  &:hover {
    color: red;
  }
`;

const TitleAndUserWrapper = styled.div`
  font-family: "Newsreader", serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all 0.5s ease-in-out;
  span {
    text-align: center;
    &:first-child {
      margin-bottom: 10px;
      font-size: 22px;
      width: 180px;

      font-weight: bolder;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 1.3;
      white-space: nowrap;
    }

    &:nth-child(2) {
      font-size: 15px;
    }
  }
  &:hover {
    color: gray;
  }
`;

const SearchArticle = styled.div<{ titleImg: string; hoverTitle: boolean }>`
  width: 200px;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid gray;

  background-image: url(${({ titleImg }) => titleImg});
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: cover;
  background-size: ${({ hoverTitle }) => (hoverTitle ? "0px" : "200px")};
  transition: background-size 0.3s ease-in-out;
`;

const TitleWrapper = styled.div<{ hoverTitle: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* visibility: ${({ hoverTitle }) => (hoverTitle ? "visible" : "hidden")}; */
  opacity: ${({ hoverTitle }) => (hoverTitle ? 1 : 0)};

  transition: opacity 0.3s ease-in-out;
  height: 70%;
`;
