import React from "react";

export default function Input({
  label,
  error,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
}) {
  return (
    <div className="flex flex-col mb-3">
      {label && (
        <label htmlFor={name} className="whitespace-nowrap">
          {label} :
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        className="border outline-none px-2.5 py-1 w-full mb-0.5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error ? (
        <p className="text-red-500 min-h-[15px] leading-none">{error}</p>
      ) : (
        ""
      )}
    </div>
  );
}
