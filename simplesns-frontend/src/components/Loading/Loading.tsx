import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import LoadingPortal from "./LoadingPortal";

export default function Loading() {
  const { loading } = useSelector((state: RootState) => state.loadingReducer);

  return (
    <>
      {loading && (
        <LoadingPortal>
          <LoadingWrapper>
            <span>Now It's Loading</span>
            <span>...</span>
          </LoadingWrapper>
        </LoadingPortal>
      )}
    </>
  );
}

const LoadingWrapper = styled.div`
  background-color: white;
  opacity: 0.8;
  z-index: 12;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 5rem;
    font-family: "Newsreader", serif;
    font-weight: bolder;
    animation: loading 1s linear infinite;
    @keyframes loading {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.2;
      }
    }
  }
`;
