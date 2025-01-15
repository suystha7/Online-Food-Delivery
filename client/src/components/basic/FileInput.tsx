"use client";

import { useId, useState, ChangeEvent, useRef, useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { UseFormRegisterReturn } from "react-hook-form";
import { Button } from "./index";
import { BUTTON_TYPES } from "@/constants";

interface IFileInputProps {
  register: UseFormRegisterReturn;
  accept?: string;
  label?: string;
  isMultiple?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
}

export default function FileInput(props: IFileInputProps) {
  const {
    register,
    accept = "*",
    label = "",
    errorMessage = "",
    isMultiple = false,
    isRequired = true,
  } = props;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { ref, onChange, ...rest } = register as {
    ref(instance: HTMLInputElement | null): void;
    onChange(event: ChangeEvent<HTMLInputElement> | null): void;
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const id = useId();

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
    }

    if (onChange) {
      onChange(event);
    }
  };

  const removeFile = (idx: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(idx, 1);
    setSelectedFiles(newFiles);

    if (newFiles.length === 0 && inputRef.current) inputRef.current.value = ""; // to reset file selected after deleting all image through delete btn
  };

  return (
    <div className="">
      <div className={`flex flex-col`}>
        <div className="flex gap-1">
          <label className="inline-block text-sm font-medium text-gray-700">
            {label}
          </label>

          {isRequired && (
            <span className="text-red-500 -translate-y-[2px]">*</span>
          )}
        </div>

        <div className="">
          <input
            id={id}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            type={"file"}
            multiple={isMultiple}
            hidden
            accept={accept}
            onChange={handleFileChange}
            {...rest}
          />

          <Button
            buttonType={BUTTON_TYPES.default}
            type="button"
            className="bg-gray-200 text-gray-700 mt-1"
            onClickHandler={handleClick}
          >
            Select {isMultiple ? "Files" : "File"}
          </Button>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4 mt-4">
          {selectedFiles.map((file, idx) => (
            <div
              className="flex flex-col gap-2 items-center justify-between"
              key={`${file.name}-${idx}`}
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-[56px] h-[56px] md:w-[96px] md:h-[96px]  object-cover rounded-lg"
                />
              ) : (
                <div className="w-[56px] md:w-[96px] flex items-center justify-center border border-gray-500 rounded-lg">
                  <span className="text-sm whitespace-nowrap text-ellipsis overflow-hidden px-2">
                    {file.name}
                  </span>
                </div>
              )}

              <button onClick={() => removeFile(idx)}>
                <RiDeleteBinLine />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
