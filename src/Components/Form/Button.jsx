import React from "react";

export default function Button({
  validation,
  type,
  label,
  bgBtn,
  bgBtnHover,
  color = "text-white",
  width,
}) {
  return (
    <button
      onClick={validation}
      type={type}
      className={`border px-5 py-1 ${bgBtn} ${color} rounded hover:${bgBtnHover} transition my-3, ${width}`}
    >
      {label}
    </button>
  );
}
