import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import SearchContents from "../../components/Post/components/SearchContents";
import { actions as postActions } from "../../redux/reducer/postReducer";
import { RootState } from "../../redux/store";

export default function Tags() {
  const { searchData, searchInput } = useSelector(
    (state: RootState) => state.searchReducer
  );
  const { hashTag } = useParams<{ hashTag: string }>();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.getHashTagData(hashTag));
    console.log("in View Render", searchData);
  }, []);

  return (
    <HomeContainer onClick={() => console.log(searchData)}>
      <SearchWordWrapper>
        <span>
          #{hashTag}로 검색한 결과 총 {searchData.length}개 존재합니다.
        </span>
      </SearchWordWrapper>
      <AritcleWrapper>
        {searchData &&
          searchData.map(
            ({ content, id, title, titleImgUrl, Comments, nick, User }) => (
              <SearchContents
                id={id}
                title={title}
                User={User}
                Comments={Comments}
                titleImgUrl={titleImgUrl}
              />
            )
          )}
      </AritcleWrapper>
    </HomeContainer>
  );
}

const SearchWordWrapper = styled.div`
  color: gray;
  opacity: 0.8;
  margin-top: 120px;
  span {
    width: fit-content;
    margin: 0 auto;
    display: block;
    font-size: 3rem;
  }
  width: 100%;
  margin-bottom: 30px;
`;

const HomeContainer = styled.main`
  margin: 70px auto 0px auto;
  width: 80%;
  min-height: 100vh;
`;

const AritcleWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
