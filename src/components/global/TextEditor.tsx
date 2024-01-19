import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

type Props = {
  value: string;
  onChange: () => void;
};

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function TextEditor({ value, onChange }: Props) {
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <QuillEditor
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full h-full mt-10 bg-white dark:bg-dark rounded-xl"
      style={{ direction: "ltr" }}
    />
  );
}
