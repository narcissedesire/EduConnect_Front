import React from "react";
import { formatCreatedAt } from "../FonctionUtile";

export default function Message({ own, text, createdAt }) {
  return (
    <div
      className={`mt-5 flex flex-col pr-2 ${
        own ? "items-end" : "ml-1 items-start"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <img
          src="/images/logo.png"
          className="w-8 h-8 rounded-full object-cover"
          alt=""
        />
        <p
          className={`p-2.5 rounded-2xl max-w-[280px] ${
            own ? "bg-gray-100 text-black " : "bg-[#1877f2] text-white"
          }`}
        >
          {text}
        </p>
      </div>
      <div className="text-[12px] pt-2.5 ml-2">
        {formatCreatedAt(createdAt)}
      </div>
    </div>
  );
}
