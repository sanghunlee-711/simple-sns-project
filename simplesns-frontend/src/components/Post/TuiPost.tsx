import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "codemirror/lib/codemirror.css";
import React from "react";
import styled from "styled-components";
import TuiEditor from "./components/tuiEditor";

export default function TuiPost(): JSX.Element {
  return (
    <>
      <PostContainer>
        <TuiEditor />
      </PostContainer>
    </>
  );
}

const PostContainer = styled.div`
  width: 80%;
  left: 10%;
  position: fixed;
  top: 70px;
  background-color: white;
  border: 1px solid black;
`;
