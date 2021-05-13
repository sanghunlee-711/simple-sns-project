import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BASE_URL } from "../../config/config.json";
import { togglePost } from "../../redux/reducer/navReducer";

interface ImageProps {
  value: string;
  src: string;
}

export default function Post(): JSX.Element {
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
        key: process.env.CLIENT_SECRET,
        "content-type": "multipart/form-data", //붙이지 않으면 multer가 인식 못한다.
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/post/img`,
        formData,
        config
      );

      setImageData([...imgData, { value: "", src: response.data.url }]);

      console.log("200", response);
      console.log(__dirname);

      // setImageData(response.data.url);
    } catch (error) {
      console.error(error);
      alert(`${error}발생`);
    }
  };

  // const uploadPost = async () => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/post`, filename);
  //     console.log(response);

  //     setImageData(response.data.url);
  //   } catch (error) {
  //     console.error(error);
  //     alert(`${error}발생`);
  //   }
  // };

  return (
    <PostContainer>
      <PostWrapper>
        <form
          id="twit-form"
          action="/post"
          method="post"
          encType="multipart/form-data"
        >
          <img src="../../../uploads/cloud31620917631665.png" alt="test" />
          <TextAreaWrapper>
            <textarea
              id="twit"
              name="content"
              maxLength={140}
              autoFocus={true}
            ></textarea>
          </TextAreaWrapper>
          <div>
            {/* show here uploaded Image in DB */}
            {imgData.map(({ value, src }) => {
              return (
                <>
                  <PreviewImg
                    id="img-preview"
                    src={src}
                    width="250"
                    alt="미리보기"
                    show={imgData ? true : false}
                  />
                  <input id="img-url" type="hidden" name="url" value={value} />
                </>
              );
            })}
          </div>
          <UplodWrapper>
            <label id="img-label" htmlFor="img">
              Add Photo
            </label>
            <input
              id="img"
              type="file"
              accept="image/*"
              onChange={(e) => showImage(e)}
            />
            <button id="twit-btn" type="submit">
              Upload
            </button>
          </UplodWrapper>
        </form>
      </PostWrapper>
      <AdWrapper>
        <div>AD HERE</div>
      </AdWrapper>
      <QuitButton onClick={() => dispatch(togglePost(false))}>
        <i className="fas fa-times fa-2x"></i>
      </QuitButton>
    </PostContainer>
  );
}

const PreviewImg = styled.img<{ show: boolean }>`
  display: ${({ show }) => (show ? "inline" : "none")};
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const PostWrapper = styled.div``;

const AdWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TextAreaWrapper = styled.div`
  textarea {
    width: 40vw;
    height: 30vh;
    resize: none;
    border: 1px solid white;
    border-radius: 0;
  }
`;

const UplodWrapper = styled.div`
  font-family: "Newsreader", serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  padding: 0 2vw;
  label {
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      color: white;
      background-color: black;
    }
  }

  input {
    display: none;
  }

  button {
    background-color: white;
    color: black;
    border: 1px solid black;
    width: 7vw;
    height: 4vh;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    border-radius: 0.4vw;
    animation: twinkling 5s infinite linear;

    @keyframes twinkling {
      0% {
        background-color: white;
        color: black;
        border: 1px solid black;
      }

      50% {
        background-color: black;
        color: white;
        border: 1px solid white;
      }

      100% {
        background-color: white;
        color: black;
        border: 1px solid black;
      }
    }

    &:hover {
      background-color: black;
      color: white;
      border: 1px solid white;
    }
  }
`;

const QuitButton = styled.button`
  background-color: white;
  border: none;
  position: absolute;
  right: 30px;
  top: 30px;

  &:hover {
    color: gray;
    transition: all 0.3s ease-in-out;
  }
`;
function dispatch(arg0: { type: "nav/DOTOGGLE_POST"; payload: boolean }): void {
  throw new Error("Function not implemented.");
}
