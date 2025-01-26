import { HTMLInputTypeAttribute } from "react";
import { ForwardedRef, forwardRef, useId, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
  errorMessage?: string;
  isRequired?: boolean;
  value?: string;
}

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      type = "text",
      label,
      placeholder = "",
      className = "",
      autoComplete = "off",
      errorMessage = "",
      isRequired = true,
      value,
      ...otherProps
    } = props;

    const id = useId();

    const [isPasswordVisisble, setIsPasswordVisible] = useState(false);

    const togglePassword = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    if (type === "password") {
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

          <div
            className={`
               flex items-center bg-white border-2 border-gray-300 rounded-md focus-within:border-blue-500 mt-1  ${
                 errorMessage ? "border-red-500" : ""
               }`}
          >
            <input
              ref={ref}
              placeholder={placeholder}
              type={isPasswordVisisble ? "text" : type}
              {...otherProps}
              id={id}
              className={`flex-1 outline-none rounded-md text-black p-2 ${className}`}
              autoComplete={"off"}
            />
            <button onClick={togglePassword} className="mr-2" type="button">
              {isPasswordVisisble ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
          )}
        </div>
      );
    }

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

        <input
          ref={ref}
          placeholder={placeholder}
          type={type}
          id={id}
          className={`
            mt-1 block w-full p-2 text-black outline-none border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errorMessage ? "border-red-500" : ""
            } ${className}`}
          autoComplete={autoComplete}
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

export default Input;
