"use client";

import useCreateCategory from "@/api/category/useCreateCategory";
import { useEffect, useState } from "react";
import { CategoryCreateFormFields } from "@/constants";
import PageLayout from "../components/PageLayout";
import CategoryTable from "./CategoryTable";
import { CategoryCreateOrUpdateDrawer } from "@/components/drawers";
import useCustomToast from "@/hooks/useCustomToast";

const Category: React.FC = () => {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const toast = useCustomToast();

  const { mutateAsync, isPending, isSuccess, error, reset } =
    useCreateCategory();

  const categoryCreateSubmitHandler = async (
    formData: CategoryCreateFormFields
  ) => {
    const { name, mainImage } = formData;

    await mutateAsync({
      name,
      mainImage,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        msg: "New category has been added successfully",
      });
      toggleDrawer(false);
    }
  }, [isSuccess]);

  return (
    <>
      {isDrawerOpen && (
        <CategoryCreateOrUpdateDrawer
          isDrawerOpen={isDrawerOpen}
          hideDrawer={() => {
            reset();
            toggleDrawer(false);
          }}
          categoryCreateOrUpdateSubmitHandler={categoryCreateSubmitHandler}
          apiError={error?.errorResponse?.message || error?.errorMessage}
          isLoading={isPending}
        />
      )}

      <PageLayout
        title="Category"
        addBtnText="Add Category"
        addBtnClickHandler={() => toggleDrawer(true)}
      >
        <CategoryTable />
      </PageLayout>
    </>
  );
};

export default Category;
