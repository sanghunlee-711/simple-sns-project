import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "codemirror/lib/codemirror.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TuiEditor from "./components/TuiEditor";

interface ImageProps {
  value: string;
  src: string;
}
export default function TuiPost() {
  const [files, setFiles] = useState<FileList[]>([]);
  const [imgData, setImageData] = useState<ImageProps[]>([]);
  const dispatch = useDispatch();

  return (
    <PostContainer>
      <TuiEditor />
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  position: relative;
`;
