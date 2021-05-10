import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/config.json";

export default function Home() {
  const [data, setData] = useState({});
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

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return <div>This is Home Comp.</div>;
}
