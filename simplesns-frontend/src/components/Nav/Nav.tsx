import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import PostPortal from "../../components/Post/components/PostPortal";
import { toggleBurger, togglePost } from "../../redux/reducer/navReducer";
import { doSearch, getSearchData } from "../../redux/reducer/searchReducer";
import { RootState } from "../../redux/store";
import TuiPost from "../Post/TuiPost";
import BurgerNav from "./components/BurgerNav";
import BurgerPortal from "./components/BurgetPortal";

export default function Nav(): JSX.Element {
  const history = useHistory();
  const postToggle = useSelector((state: RootState) => state.navReducer.toggle);
  const burgerToggle = useSelector(
    (state: RootState) => state.navReducer.burgerToggle
  );
  const searchWord = useSelector(
    (state: RootState) => state.searchReducer.searchInput
  );
  const dispatch = useDispatch();

  return (
    <>
      <NavContainer>
        <NavWrapper>
          <Logo onClick={() => history.push("/")}>Simple SNS</Logo>
          <NavButtonWrapper>
            <SearchWrapper>
              <input
                value={searchWord}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(getSearchData(e.target.value as string))
                }
              />
              <button
                onClick={() => {
                  dispatch(doSearch(searchWord));
                }}
              >
                Search!
              </button>
            </SearchWrapper>
            <PostButton
              onClick={() => {
                dispatch(togglePost(!postToggle));
              }}
            >
              Post
            </PostButton>
            <BurgerButtonWrapper
              onClick={() => dispatch(toggleBurger(!burgerToggle))}
            >
              <i className="fas fa-bars fa-2x"></i>
            </BurgerButtonWrapper>
          </NavButtonWrapper>
        </NavWrapper>
      </NavContainer>
      {burgerToggle && (
        <BurgerPortal>
          <BurgerNav />
        </BurgerPortal>
      )}
      {postToggle && (
        <PostPortal>
          <TuiPost />
        </PostPortal>
      )}
    </>
  );
}

const NavButtonWrapper = styled.div`
  display: flex;
  width: fit-content;
  button {
    margin-right: 3vw;
  }
`;

const SearchWrapper = styled.div``;

const BurgerButtonWrapper = styled.div``;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: auto;
`;

const NavContainer = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease-in-out;
  font-family: "Newsreader", serif;

  &:hover {
    animation: animationForBorder 3s infinite;

    @keyframes animationForBorder {
      0% {
        opacity: 1;
        border-bottom: 1px solid black;
      }
      50% {
        opacity: 1;
        border-bottom: 1px solid white;
      }
      100% {
        opacity: 1;
        border-bottom: 1px solid black;
      }
    }
  }
`;
const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;

const PostButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  width: 7vw;
  height: 4vh;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  border-radius: 0.4vw;
  display: static;
`;
