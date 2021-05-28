import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { doSearch } from "../../redux/reducer/searchReducer";
import { RootState } from "../../redux/store";

export default function Search() {
  const { searchData, searchInput } = useSelector(
    (state: RootState) => state.searchReducer
  );
  const { searchWord } = useParams<{ searchWord: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doSearch(searchWord));
    console.log("in View Render", searchData);
  }, []);

  return (
    <HomeContainer>
      <SearchWordWrapper>
        <span>
          {searchWord}로 검색한 결과 총 {searchData.length}개 존재합니다.
        </span>
      </SearchWordWrapper>
      <AritcleWrapper>
        {searchData &&
          searchData.map(
            ({ content, id, title, titleImgUrl, Comments, nick, User }) => (
              <>
                <span>{title}</span>
                <span>{id}</span>
              </>
            )
          )}
      </AritcleWrapper>
    </HomeContainer>
  );
}

const SearchWordWrapper = styled.div``;

const HomeContainer = styled.main`
  margin-top: 70px;
`;

const AritcleWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
