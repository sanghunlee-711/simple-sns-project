import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FootWrapper>
        <span>
          Copyright © 2021- CloudLee(Lee SangHun). &nbsp; All right reserved.
        </span>
        <a
          href="https://github.com/sanghunlee-711"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-laptop-code fa-2x"></i>
        </a>
      </FootWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  border-top: 1px solid black;
  width: 100%;
  margin: 0 auto;
  font-family: "Newsreader", serif;
`;

const FootWrapper = styled.div`
  width: 80%;
  min-height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  span {
    font-weight: bolder;
  }

  a {
    transition: all 0.3s ease-in-out;
    margin-right: 2px;
    &:hover {
      color: gray;
      border-radius: 10%;
    }

    &:visited {
      color: black;
    }

    &:active {
      color: white;
    }

    cursor: pointer;
  }
`;
