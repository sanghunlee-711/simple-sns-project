import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}
const LoadingPortal = ({ children }: PortalProps) => {
  const el = document.getElementById("loading");
  return ReactDOM.createPortal(children, el as Element);
};

export default LoadingPortal;
