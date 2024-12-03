import React from "react";

export default function ChatOnline() {
  return (
    <div className="cursor-pointer flex items-center font-medium gap-2 mt-2 hover:bg-gray-100 p-1.5">
      <div className=" relative">
        <img
          src="/images/logo.png"
          className="w-9 h-9 rounded-full object-cover "
          alt=""
        />
        <div className="absolute h-2.5 w-2.5 rounded-full bg-lime-500 top-[3px] right-[3px]" />
      </div>
      <div className="">Narcisse</div>
    </div>
  );
}
