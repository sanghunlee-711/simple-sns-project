import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}
const PostPortal = ({ children }: PortalProps) => {
  const el = document.getElementById("post");
  return ReactDOM.createPortal(children, el as Element);
};

export default PostPortal;
