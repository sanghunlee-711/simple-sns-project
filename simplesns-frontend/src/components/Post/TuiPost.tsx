import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "codemirror/lib/codemirror.css";
import React from "react";
import styled from "styled-components";
import TuiEditor from "./components/TuiEditor";

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
  position: absolute;
  top: 10vh;
  background-color: white;
  border: 1px solid black;
`;
