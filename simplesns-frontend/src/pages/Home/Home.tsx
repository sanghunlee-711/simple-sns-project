import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TuiViewer from "../../components/Post/components/TuiViewer";
import { BASE_URL } from "../../config/config.json";
import { ContentsData } from "../../model/ArticleModel";

export default function Home() {
  const [data, setData] = useState<ContentsData[]>([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          authorization: sessionStorage.getItem("token"),
          key: process.env.CLIENT_SECRET,
        }, //API 요청
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HomeContainer>
      <AritcleWrapper>
        {data.map(
          ({ content, id, title, titleImgUrl, Comments, nick, User }) => (
            <TuiViewer
              User={User}
              nick={nick}
              id={id}
              content={content}
              key={`${id}post Viewer`}
              title={title}
              titleImgUrl={titleImgUrl}
              comments={Comments}
            />
          )
        )}
      </AritcleWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  margin-top: 70px;
`;

const AritcleWrapper = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
