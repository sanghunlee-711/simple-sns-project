import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";
export default function Post(): JSX.Element {
  const [files, setFiles] = useState<FileList[]>([]);
  const [imgData, setImageData] = useState("");
  const showImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newForm = new FormData();
    const files = e.target.files as FileList;
    const _file = files[0] as File;
    newForm.append("img", _file);

    try {
      const response = await axios.post(`${BASE_URL}/post/img`, newForm);
      console.log(response);

      setImageData(response.data.url);
    } catch (error) {
      console.error(error);
      alert(`${error}발생`);
    }
  };

  return (
    <div>
      <div>
        <form
          id="twit-form"
          action="/post"
          method="post"
          encType="multipart/form-data"
        >
          <div>
            <textarea id="twit" name="content" maxLength={140}></textarea>
          </div>
          <div>
            {/* show here uploaded Image in DB */}
            <PreviewImg
              id="img-preview"
              src={imgData}
              width="250"
              alt="미리보기"
              show={imgData ? true : false}
            />
            <input id="img-url" type="hidden" name="url" value={imgData} />
          </div>
          <div>
            <label id="img-label" htmlFor="img">
              사진 업로드
            </label>
            <input
              id="img"
              type="file"
              accept="image/*"
              onChange={(e) => showImage(e)}
            />
            <button id="twit-btn" type="submit">
              짹짹
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const PreviewImg = styled.img<{ show: boolean }>`
  display: ${({ show }) => (show ? "inline" : "none")};
`;
