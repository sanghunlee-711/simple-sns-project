import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BASE_URL, CLIENT_SECRET } from "../../config/config.json";
import TuiEditor from "./components/TuiEditor";

interface ImageProps {
  value: string;
  src: string;
}
export default function TuiPost() {
  const [files, setFiles] = useState<FileList[]>([]);
  const [imgData, setImageData] = useState<ImageProps[]>([]);
  const dispatch = useDispatch();

  const showImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();

    const files = e.target.files as FileList;
    const _file = files[0] as File;
    formData.append("img", _file);

    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
        key: CLIENT_SECRET,
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/post/img`,
        formData,
        config
      );

      setImageData([...imgData, { value: "", src: response.data.url }]);
      let newImg = document.createElement("img");
      newImg.setAttribute("src", response.data.url);
      const twit = document.getElementById("twit") as HTMLElement;
      twit.appendChild(newImg);
    } catch (error) {
      console.error(error);
      alert(`${error}발생`);
    }
  };
  return (
    <PostContainer>
      <div>
        <TuiEditor />
      </div>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;
