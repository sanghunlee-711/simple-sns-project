import React from "react";
import ReactDOM from "react-dom";

interface BurgerProps {
  children: React.ReactNode;
}
const BurgerPortal = ({ children }: BurgerProps) => {
  const el = document.getElementById("burger");
  return ReactDOM.createPortal(children, el as Element);
};

export default BurgerPortal;
