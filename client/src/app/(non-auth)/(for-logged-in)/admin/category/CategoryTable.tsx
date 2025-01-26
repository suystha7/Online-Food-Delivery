"use client";

import useGetAllCategories, {
  getAllCategories,
} from "@/api/category/useGetAllCategories";
import PaginatedTable from "../components/PaginatedTable";
import CategoryTableRow from "./CategoryTableRow";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteCategory from "@/api/category/useDeleteCategory";
import useUpdateCategory from "@/api/category/useUpdateCategory";
import { Category } from "@/api/category/CategoryTypes";
import { useState, useEffect } from "react";
import { CategoryCreateFormFields, CategoryUpdateFormFields } from "@/constants";
import { CategoryCreateOrUpdateDrawer } from "@/components/drawers";
import { DeleteModal } from "@/components/modals";
import useCustomToast from "@/hooks/useCustomToast";

export default function CategoryTable() {
  const [page, setPage] = useState<number>(1);

  const [isDrawerOpen, toggleDrawer] = useState<boolean>(false);

  const [isModalOpen, toggleModal] = useState<boolean>(false);

  const { data, isPending, isError, error } = useGetAllCategories({
    page,
    limit: 5,
  });

  const toast = useCustomToast();

  const tableHeadingList = ["S.N.", "Name", "Image", "Created At", "Actions"];

  const queryClient = useQueryClient();

  let startIndex: number = 0,
    endIndex: number = 0;

  const [editableCategory, setEditableCategory] = useState<Category>();

  const [categoryId, setCategoryId] = useState<string>("");

  const deleteCategory = useDeleteCategory();

  const updateCategory = useUpdateCategory();

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["get-categories", page + 1],
        queryFn: () => getAllCategories({ page: page + 1, limit: 5 }),
      });
    }

    // suppose user is on the last pagination and there is only entry in it and deletes that entry then user needs to be navigated to new last pagination
    if (data && data.totalPages < page) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  useEffect(() => {
    if (!isModalOpen) {
      deleteCategory.reset();
    }
  }, [isModalOpen]);

  const categoryDeleteSubmitHandler = async () => {
    await deleteCategory.mutateAsync({ categoryId });
  };

  const deleteModalOpenHandler = (categoryId: string) => {
    setCategoryId(categoryId);
    toggleModal(true);
  };

  useEffect(() => {
    if (deleteCategory.isSuccess) {
      toast({
        msg: "Category has been deleted successfully",
      });
      toggleModal(false);
    }
  }, [deleteCategory.isSuccess]);

  useEffect(() => {
    if (!isDrawerOpen) {
      updateCategory.reset();
    }
  }, [isDrawerOpen]);

  const categoryUpdateSubmitHandler = async (
    formData: CategoryUpdateFormFields
  ) => {
    const { name, mainImage } = formData;
    let updates = {};

    if (name?.length !== 0) {
      updates = {
        ...updates,
        name,
      };
    }

    if (mainImage) {
      updates = {
        ...updates,
        mainImage,
      };
    }

    if (Object.keys(updates).length > 0) {
      await updateCategory.mutateAsync({
        categoryId: editableCategory!._id,
        ...updates,
      });
    }
  };

  const editBtnClickHandler = (category: Category) => {
    setEditableCategory(category);
    toggleDrawer(true);
  };

  useEffect(() => {
    if (updateCategory.isSuccess) {
      toast({
        msg: "Category has been updated successfully",
      });
      toggleDrawer(false);
    }
  }, [updateCategory.isSuccess]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.errorResponse?.message || error.errorMessage}</span>;
  } else {
    startIndex = data.serialNumber;
    endIndex = Math.min(
      data.serialNumber + data.limit - 1,
      data.totalCategories
    );
  }

  return (
    <>
      {isDrawerOpen && (
        <CategoryCreateOrUpdateDrawer
          isDrawerOpen={isDrawerOpen}
          hideDrawer={() => {
            toggleDrawer(false);
          }}
          categoryCreateOrUpdateSubmitHandler={categoryUpdateSubmitHandler}
          apiError={
            updateCategory.error?.errorResponse?.message ||
            updateCategory.error?.errorMessage
          }
          category={editableCategory}
          isUpdateMode={true}
          isLoading={updateCategory.isPending}
        />
      )}

      {isModalOpen && (
        <DeleteModal
          isLoading={deleteCategory.isPending}
          apiError={
            deleteCategory.error?.errorResponse?.message ||
            deleteCategory.error?.errorMessage
          }
          deleteHandler={categoryDeleteSubmitHandler}
          cancelHandler={() => {
            toggleModal(false);
          }}
        />
      )}

      <PaginatedTable
        hasData={data?.categories.length > 0}
        tableHeadingList={tableHeadingList}
        currentPage={page}
        startIndex={startIndex}
        endIndex={endIndex}
        totalDocs={data.totalCategories}
        totalPages={data.totalPages}
        setPage={setPage}
        tableCaption="List of all categories"
      >
        {data.categories.map((category, idx) => (
          <CategoryTableRow
            key={idx}
            index={data.serialNumber + idx}
            item={category}
            editBtnClickHandler={editBtnClickHandler}
            deleteModalOpenHandler={deleteModalOpenHandler}
          />
        ))}
      </PaginatedTable>
    </>
  );
}
