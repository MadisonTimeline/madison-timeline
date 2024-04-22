import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Delta from "quill-delta";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: Delta;
  onChange: (value: Delta) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const [editorValue, setEditorValue] = useState<Delta>(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleEditorChange = (content: string, delta: Delta, source: string, editor: any) => {
    if (source === "user") {
      const newDelta = new Delta(editor.getContents());
      // console.log("Current Delta:", newDelta); debugging
      onChange(newDelta);
      setEditorValue(newDelta); // Update editor state immediately
    }
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={editorValue}
      onChange={handleEditorChange}
    />
  );
}
