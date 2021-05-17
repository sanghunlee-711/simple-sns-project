import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "codemirror/lib/codemirror.css";
import React, { useEffect, useState } from "react";

let toastEditor: Editor;
export default function TuiEditor() {
  const [content, setContent] = useState("");

  useEffect(() => {
    toastEditor = new Editor({
      el: document.querySelector("#editSection") as HTMLElement,
      initialEditType: "wysiwyg", // 'markdown'
      previewStyle: "vertical",
      height: "60vh",
    });
  }, []);

  const saveArticle = () => {
    const content = toastEditor.getHtml();
    console.log("content", content);

    setContent(content);
  };

  return (
    <div id="toastEditor" style={{ zIndex: 10 }}>
      <div id="editSection"></div>
      <button onClick={() => saveArticle()} className="btn_save">
        Save
      </button>
    </div>
  );
}
