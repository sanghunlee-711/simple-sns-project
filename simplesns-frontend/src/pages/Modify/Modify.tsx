import Editor from "@toast-ui/editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BASE_URL, CLIENT_SECRET } from "../../config/config.json";
import { actions } from "../../redux/reducer/postReducer";
import { RootState } from "../../redux/store";

interface AritcleInfo {
  title: string;
  titleImgUrl: string;
  content: string;
  createdAt: string;
}
interface UserInfo {
  email: string;
  nick: string;
  id: number;
}

let toastEditor: Editor;

export default function Modify() {
  const _postId = useSelector((state: RootState) => state.postReducer.postId);
  const [modifyTitle, setModifyTitle] = useState<string>("");
  const [modifyArticleData, setModifyArticleData] = useState<
    AritcleInfo | Record<string, string>
  >({});
  const history = useHistory();
  const dispatch = useDispatch();

  const [titleImgUrl, setTitleImgUrl] = useState<string>("");

  const [userData, setUserData] = useState<UserInfo | Record<string, string>>(
    {}
  );
  const getData = async () => {
    const url = `${BASE_URL}/post/${_postId}`;
    const setting = {
      headers: {
        authorization: sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : "",
        key: process.env.CLIENT_SECRET,
      }, //API 요청
    };

    try {
      const response = await axios.get(url, setting);
      console.log(response.data);
      setModifyArticleData(response.data);
      setUserData(response.data.User);
      setModifyTitle(response.data.title);
      // setData(response.data);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    toastEditor = new Editor({
      el: document.querySelector("#editSection") as HTMLElement,
      initialEditType: "wysiwyg", // 'markdown'
      previewStyle: "vertical",
      initialValue: modifyArticleData.content as string,
      height: "100vh",
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
  }, [modifyArticleData]);

  const handleTitleImage = (e: React.PointerEvent<HTMLImageElement>) => {
    const _eventTarget = e.target as HTMLImageElement;
    if (_eventTarget && _eventTarget.src) {
      const _NodeListOfTitleImage = document.querySelectorAll(
        ".postTitleImage"
      );

      for (let i = 0; i < _NodeListOfTitleImage.length; i++) {
        _NodeListOfTitleImage[i].classList.remove("postTitleImage");
      }

      _eventTarget.className += "postTitleImage";

      setTitleImgUrl(_eventTarget.src);
      alert("타이틀 이미지가 변경되었습니다.");
    }
  };

  const { title, content } = modifyArticleData;
  const { email, nick } = userData;

  return (
    <>
      <ModifyContainer>
        <HeaderWrapper>
          <Title>
            <input
              autoFocus
              value={modifyTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setModifyTitle(e.target.value)
              }
            />
          </Title>
          <UserInfoWrapper>
            <p>
              Email Is <span>{email}</span>
            </p>
            <p>
              Written By<span>{nick}</span>
            </p>
          </UserInfoWrapper>
        </HeaderWrapper>
        {/* <TitleImage /> */}
        <EdtiorContainer
          id="toastEditor"
          onClick={(e: React.PointerEvent<HTMLImageElement>) =>
            handleTitleImage(e)
          }
        >
          <div id="editSection"></div>
        </EdtiorContainer>
        <BottomContainer>
          <ButtonWrapper>
            <SaveButton
              onClick={() => {
                dispatch(
                  actions.modifyContent(
                    _postId,
                    toastEditor.getHtml(),
                    titleImgUrl,
                    modifyTitle
                  )
                );
              }}
              className="btn_save"
            >
              MODIFY
            </SaveButton>
            <CancelButton
              onClick={() => history.push("/")}
              className="btn_save"
            >
              CANCEL
            </CancelButton>
          </ButtonWrapper>
        </BottomContainer>
      </ModifyContainer>
      <style>{titleStyle}</style>
    </>
  );
}

const BottomContainer = styled.div`
  width: 100%;
  margin: 2vh 0;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SaveButton = styled.button`
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
  height: 60px;
  width: 160px;

  &:hover {
    color: white;
    background-color: black;
  }
`;

const CancelButton = styled(SaveButton)`
  margin-left: 2vw;
`;

const EdtiorContainer = styled.div`
  img {
    max-width: 30%;
    height: auto;
    width: auto\9; /* ie8 */
  }
`;

const ModifyContainer = styled.section`
  margin: 20vh auto 70px auto;
  width: 80%;
  font-family: "Newsreader", serif;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2vh;
  padding-bottom: 2vh;
  height: 100%;
  border-top: 2px solid black;
`;
const Title = styled.span`
  height: 100%;
  input {
    font-size: 3rem;
    font-family: "Newsreader", serif;
    border: 1px solid gray;
    line-height: 2;
  }
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100%;
  p {
    font-weight: bold;
    span {
      margin-left: 1vw;
      font-weight: normal;
    }
  }
`;

const titleStyle = `
  border: 3px solid red;
`;
