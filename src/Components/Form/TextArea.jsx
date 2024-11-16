import React from "react";

export default function TextArea({
  label,
  error,
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="flex flex-col mb-1">
      <label htmlFor={name} className="whitespace-nowrap">
        {label} :
      </label>
      <textarea
        id={name}
        name={name}
        className="border outline-none px-2.5 py-1 w-full mb-0.5"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows="4"
      />
      {error ? (
        <p className="text-red-500 min-h-[15px] leading-none">{error}</p>
      ) : (
        ""
      )}
    </div>
  );
}
