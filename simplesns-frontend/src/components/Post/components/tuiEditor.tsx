import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import axios from "axios";
import "codemirror/lib/codemirror.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL, CLIENT_SECRET } from "../../../config/config.json";

interface ImageProps {
  value: string;
  src: string;
}

let toastEditor: Editor;
export default function TuiEditor() {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList[]>([]);
  const [imgData, setImageData] = useState<ImageProps[]>([]);
  const dispatch = useDispatch();

  const saveImageToS3 = async (blob: File | Blob) => {
    console.log("SAVEIMGAE TO S3");
    let url = "TestURL";
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
    console.log(_htmlContent);
    // /post로 post content전부 post 보내기
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
        },
        config
      );
      console.log(response);
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
      height: "60vh",
      hooks: {
        addImageBlobHook: async function (blob, callback) {
          //blob을 s3로 넘겨서 저장하고 그 경로를 다시 받아서 콜백에 넣어주는 방식으로 구성하면 될듯
          console.log(blob);
          const imgUrl = saveImageToS3(blob);
          callback(await imgUrl, "newOne");
          console.log(callback);
          console.log("It's In Hooks!");
          return false;
        },
      },
    });
  }, []);

  return (
    <div id="toastEditor">
      <div id="editSection"></div>
      <button onClick={() => savePost()} className="btn_save">
        Save
      </button>
    </div>
  );
}
