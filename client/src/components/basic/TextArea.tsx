"use cilent";

import { ForwardedRef, forwardRef, useId, useState } from "react";

interface TextAreaProps {
  label: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  isRequired?: boolean;
  value?: string;
}

const TextArea = forwardRef(
  (props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const {
      label,
      rows,
      cols,
      placeholder = "",
      className = "",
      errorMessage = "",
      isRequired = true,
      value,
      ...otherProps
    } = props;

    const id = useId();

    return (
      <div className={`flex flex-col`}>
        <div className="flex gap-1">
          <label
            htmlFor={id}
            className="inline-block text-sm font-medium text-gray-700 cursor-pointer"
          >
            {label}
          </label>

          {isRequired && (
            <span className="text-red-500 -translate-y-[2px]">*</span>
          )}
        </div>

        <textarea
          ref={ref}
          rows={rows ?? 4}
          cols={cols ?? 4}
          autoComplete={"off"}
          placeholder={placeholder}
          id={id}
          className={`
            mt-1 block w-full p-2 text-black outline-none border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errorMessage ? "border-red-500" : ""
            } ${className}`}
          defaultValue={value}
          {...otherProps}
        />

        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default TextArea;
