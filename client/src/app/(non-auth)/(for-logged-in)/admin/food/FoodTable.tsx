"use client";

import PaginatedTable from "../components/PaginatedTable";
import FoodTableRow from "./FoodTableRow";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FoodCreateFormFields } from "@/constants";
import { FoodCreateOrUpdateDrawer } from "@/components/drawers";
import { DeleteModal } from "@/components/modals";
import useGetAllFoods, { getAllFoods } from "@/api/food/useGetAllFoods";
import { Food } from "@/api/food/FoodTypes";
import useDeleteFood from "@/api/food/useDeleteFood";
import useUpdateFood from "@/api/food/useUpdateFood";
import useCustomToast from "@/hooks/useCustomToast";

export default function FoodTable() {
  const [page, setPage] = useState<number>(1);

  const [isDrawerOpen, toggleDrawer] = useState<boolean>(false);

  const [isModalOpen, toggleModal] = useState<boolean>(false);

  const { data, isPending, isError, error } = useGetAllFoods({
    page,
    limit: 5,
  });

  const toast = useCustomToast();

  const tableHeadingList = [
    "S.N.",
    "Name",
    "Category",
    "Main Image",
    "Price",
    "Stock",
    "description",
    "Discount",
    // "SubImage",
    "Actions",
  ];

  const queryClient = useQueryClient();

  let startIndex: number = 0,
    endIndex: number = 0;

  const [editableFood, setEditableFood] = useState<Food>();

  const [foodId, setFoodId] = useState<string>("");

  const deleteFood = useDeleteFood();

  const updateFood = useUpdateFood();

  useEffect(() => {
    if (data?.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ["get-foods", page + 1],
        queryFn: () => getAllFoods({ page: page + 1, limit: 5 }),
      });
    }

    // suppose user is on the last pagination and there is only entry in it and deletes that entry then user needs to be navigated to new last pagination
    if (data && data.totalPages < page) {
      setPage(data.totalPages);
    }
  }, [data, page]);

  useEffect(() => {
    if (!isModalOpen) {
      deleteFood.reset();
    }
  }, [isModalOpen]);

  const foodDeleteSubmitHandler = async () => {
    await deleteFood.mutateAsync({ foodId });
  };

  const deleteModalOpenHandler = (foodId: string) => {
    setFoodId(foodId);
    toggleModal(true);
  };

  useEffect(() => {
    if (deleteFood.isSuccess) {
      toast({
        msg: "Food has been deleted successfully",
      });
      toggleModal(false);
    }
  }, [deleteFood.isSuccess]);

  useEffect(() => {
    if (!isDrawerOpen) {
      updateFood.reset();
    }
  }, [isDrawerOpen]);

  const foodUpdateSubmitHandler = async (formData: FoodCreateFormFields) => {
    const {
      name,
      category,
      description,
      price,
      stock,
      discount,
      mainImage,
      subImages,
    } = formData;

    await updateFood.mutateAsync({
      foodId: editableFood!._id,
      name,
      category: category!.value,
      description,
      discount: parseInt(discount || "0"),
      price: parseInt(price),
      stock: parseInt(stock),
      mainImage,
      subImages,
    });
  };

  const editBtnClickHandler = (food: Food) => {
    setEditableFood(food);
    toggleDrawer(true);
  };

  useEffect(() => {
    if (updateFood.isSuccess) {
      toast({
        msg: "Food has been udpated successfully",
      });
      toggleDrawer(false);
    }
  }, [updateFood.isSuccess]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{error.errorResponse?.message || error.errorMessage}</span>;
  } else {
    startIndex = data.serialNumber;
    endIndex = Math.min(data.serialNumber + data.limit - 1, data.totalFoods);
  }

  return (
    <>
      {isDrawerOpen && (
        <FoodCreateOrUpdateDrawer
          isDrawerOpen={isDrawerOpen}
          hideDrawer={() => {
            toggleDrawer(false);
          }}
          foodCreateOrUpdateSubmitHandler={foodUpdateSubmitHandler}
          apiError={
            updateFood.error?.errorResponse?.message ||
            updateFood.error?.errorMessage
          }
          food={editableFood}
          isUpdateMode={true}
          isLoading={isPending}
        />
      )}

      {isModalOpen && (
        <DeleteModal
          isLoading={deleteFood.isPending}
          apiError={
            deleteFood.error?.errorResponse?.message ||
            deleteFood.error?.errorMessage
          }
          deleteHandler={foodDeleteSubmitHandler}
          cancelHandler={() => {
            toggleModal(false);
          }}
        />
      )}

      <PaginatedTable
        hasData={data?.foods.length > 0}
        tableHeadingList={tableHeadingList}
        currentPage={page}
        startIndex={startIndex}
        endIndex={endIndex}
        totalDocs={data.totalFoods}
        totalPages={data.totalPages}
        setPage={setPage}
        tableCaption="List of all foods"
      >
        {data.foods.map((food, idx) => (
          <FoodTableRow
            key={idx}
            index={data.serialNumber + idx}
            item={food}
            editBtnClickHandler={editBtnClickHandler}
            deleteModalOpenHandler={deleteModalOpenHandler}
          />
        ))}
      </PaginatedTable>
    </>
  );
}
