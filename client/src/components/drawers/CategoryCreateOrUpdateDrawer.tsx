"use client";

import { Category } from "@/api/category/CategoryTypes";
import { Input, Drawer, ErrorMessage, Button, FileInput } from "../basic";
import {
  ALLOWED_IMAGE_FILE_TYPES,
  BUTTON_TYPES,
  CategoryCreateFormFields,
} from "@/constants";
import { categoryCreateValidationSchema } from "@/schema/categoryCreate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getCapitalizedForm } from "@/utils/helpers";

interface CategoryCreateOrUpdateDrawerProps {
  isDrawerOpen: boolean;
  hideDrawer(): void;
  categoryCreateOrUpdateSubmitHandler: (
    formData: CategoryCreateFormFields
  ) => void;
  apiError?: string;
  isLoading?: boolean;
  category?: Category;
  isUpdateMode?: boolean;
}
const CategoryCreateOrUpdateDrawer = (
  props: CategoryCreateOrUpdateDrawerProps
) => {
  const {
    isDrawerOpen,
    hideDrawer,
    categoryCreateOrUpdateSubmitHandler,
    apiError = "",
    isLoading = false,
    category,
    isUpdateMode = false,
  } = props;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CategoryCreateFormFields>({
    resolver: zodResolver(categoryCreateValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      name: isUpdateMode
        ? getCapitalizedForm({ sentence: category!.name })
        : "",
      mainImage: undefined,
    },
  });

  return (
    <>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        heading={`${isUpdateMode ? "Update Category" : "Add Category"}`}
        hideDrawer={() => {
          reset();
          hideDrawer();
        }}
      >
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(categoryCreateOrUpdateSubmitHandler)}
        >
          {apiError && <ErrorMessage message={apiError} className="text-sm" />}

          <Input
            type="text"
            label="Name"
            placeholder={"Enter category name"}
            errorMessage={errors.name?.message || ""}
            {...register("name")}
          />

          <FileInput
            label="Image"
            errorMessage={errors.mainImage?.message || ""}
            register={register("mainImage")}
            accept={ALLOWED_IMAGE_FILE_TYPES.toString()}
          />

          <Button
            type="submit"
            buttonType={BUTTON_TYPES.primaryButton}
            onClickHandler={() => {}}
            className="tracking-wider mx-auto mt-4"
            isLoading={isLoading}
          >
            {isUpdateMode ? <span>Update</span> : <span>Create</span>}
          </Button>
        </form>
      </Drawer>
    </>
  );
};

export default CategoryCreateOrUpdateDrawer;
