"use client";

import React, { useId } from "react";
import {
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import Select, { GroupBase, StylesConfig, Props } from "react-select";

interface ControlledSelectProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<Props<Option, IsMulti, Group>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label?: string;
  defValue?: Option;
  placeholderStyle?: object;
  dropdownIndicatorStyle?: object;
  isClearable?: boolean;
}

export default function ControlledSelect<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  options,
  control,
  rules,
  shouldUnregister = false,
  isClearable = true,
  placeholderStyle = {},
  dropdownIndicatorStyle = {},
  defValue,
  ...selectProps
}: ControlledSelectProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  const id = useId();

  const styles: StylesConfig<Option, IsMulti, Group> = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "2px",
      outlineColor: "none",
      borderColor: state.isFocused
        ? "#3b82f6 !important"
        : error?.message
        ? "#ef4444"
        : "#d1d5db",
      boxShadow: "none",
    }),

    placeholder: (provided, _) => ({
      ...provided,
      ...placeholderStyle,
    }),

    dropdownIndicator: (provided, _) => ({
      ...provided,
      ...dropdownIndicatorStyle,
    }),

    option: (provided, state) => ({
      ...provided,
      bg: state.isSelected ? "rgb(53, 124, 123) !important" : "white",
      minW: state.isSelected ? "max-content" : "100%",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      px: "0.75rem !important",
    }),
    
  };

  return (
    <div className={`flex flex-col`}>
      {label && (
        <div className="flex gap-1">
          <label
            htmlFor={id}
            className="inline-block text-sm font-medium text-gray-700 cursor-pointer"
          >
            {label}
          </label>

          <span className="text-red-500 -translate-y-[2px]">*</span>
        </div>
      )}

      <Select<Option, IsMulti, Group>
        inputId={id}
        openMenuOnFocus={true}
        options={options}
        isClearable={isClearable}
        {...selectProps}
        {...field}
        styles={styles}
        defaultValue={defValue}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}
