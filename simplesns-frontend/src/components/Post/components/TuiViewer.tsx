import React from "react";
import styled from "styled-components";

interface ITuiViewer {
  content: string;
}

export default function TuiViewer({ content }: ITuiViewer) {
  return (
    <ViewerWrapper
      dangerouslySetInnerHTML={{ __html: content }}
    ></ViewerWrapper>
  );
}

const ViewerWrapper = styled.div`
  overflow: hidden;
  border: 1px solid black;
  width: 30vw;
  height: 30vh;
  img {
  }
`;
