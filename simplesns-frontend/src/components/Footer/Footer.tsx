import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <span>This is Footer</span>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  font-family: "Tw Cen W01 Medium";
`;
