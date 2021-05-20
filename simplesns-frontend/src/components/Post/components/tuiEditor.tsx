import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL, CLIENT_SECRET } from "../../../config/config.json";

let toastEditor: Editor;
export default function TuiEditor(): JSX.Element {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [titleImgUrl, setTitleImgUrl] = useState<string>("");
  const history = useHistory();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") {
      return setTitle(value);
    }
  };

  const saveImageToS3 = async (blob: File | Blob) => {
    let url = "";
    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
        key: CLIENT_SECRET,
      },
    };
    const formData = new FormData();
    const _file = blob as File;
    formData.append("img", _file);

    try {
      const response = await axios.post(
        `${BASE_URL}/post/img`,
        formData,
        config
      );
      url = await response.data.url;
    } catch (error) {
      alert("Error : ");
      console.error(error);
    }
    return url;
  };

  const savePost = async () => {
    const _htmlContent = toastEditor.getHtml();
    const _title = title.length < 1 ? "제목을 입력하지 않은 글이에요" : title;
    const _titleImgUrl = titleImgUrl;
    if (_titleImgUrl.length < 1) {
      return alert("하나이상의 사진은 꼭 업로드 해주셔야 합니다.");
    }

    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
        key: CLIENT_SECRET,
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/post`,
        {
          content: _htmlContent,
          title: _title,
          titleImgUrl: _titleImgUrl,
        },
        config
      );
      console.log("DELEELELELETETETE RESPONSSESE", response);
      if (response.status !== 200) {
        return alert(`${response.status} Error 발생`);
      } else {
        alert("업로드가 완료 되었습니다.");
        history.push("/");
        return window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Error:!");
    }

    setContent(content);
  };

  useEffect(() => {
    toastEditor = new Editor({
      el: document.querySelector("#editSection") as HTMLElement,
      initialEditType: "wysiwyg", // 'markdown'
      previewStyle: "vertical",
      height: "70vh",
      hooks: {
        addImageBlobHook: async function (blob, callback) {
          //blob을 s3로 넘겨서 저장하고 그 경로를 다시 받아서 콜백에 넣어주는 방식으로 구성하면 될듯
          const imgUrl = await saveImageToS3(blob);
          if (titleImgUrl.length <= 1) {
            setTitleImgUrl(imgUrl);
          }

          callback(imgUrl, "newOne");
          return false;
        },
      },
    });
  }, []);

  return (
    <EditorContainer>
      <EditorWrapper id="toastEditor">
        <PostTitle>Post Your Story</PostTitle>
        <div id="editSection"></div>
        <SaveButton onClick={() => savePost()} className="btn_save">
          Save
        </SaveButton>
      </EditorWrapper>
      <TitleContainer>
        <TitleWrapper>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e) => handleInput(e)}
            placeholder="Type Your Title!"
          />
          {titleImgUrl.length >= 1 ? (
            <img src={titleImgUrl} alt="title" />
          ) : (
            <div>
              <span>Upload Main Image For Your Post!</span>
            </div>
          )}
        </TitleWrapper>
        <AdContainer>This is for Ad!</AdContainer>
      </TitleContainer>
    </EditorContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2vh 2vw;
`;
const AdContainer = styled.div`
  width: 33vw;
  height: 15vh;
  border: 1px solid black;
`;

const TitleWrapper = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 33vw;
    height: 5vh;
    margin-bottom: 2vh;
    color: black;
    font-size: 20px;
    font-family: "Newsreader", serif;
    font-weight: bold;
    padding: 0;
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 33vw;
    max-height: 50vh;
    object-fit: scale-down;
  }
  div {
    width: 33vw;
    height: 50vh;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      color: black;
      font-size: 20px;
      font-family: "Newsreader", serif;
      font-weight: bold;
    }
  }
`;

const EditorContainer = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const SaveButton = styled.button`
  margin: 2vh 0;
  background-color: white;
  border: 1.5px solid black;
  color: black;
  border-radius: 2px;
  transition: all 0.5s ease-in-out;
  width: 18vw;
  height: 5vh;
  font-size: 2rem;
  font-weight: bolder;
  font-family: "Newsreader", serif;
`;

const PostTitle = styled.span`
  color: black;
  font-size: 2rem;
  font-family: "Newsreader", serif;
  margin-bottom: 1vh;
`;

const EditorWrapper = styled.div`
  margin: 2vh 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
