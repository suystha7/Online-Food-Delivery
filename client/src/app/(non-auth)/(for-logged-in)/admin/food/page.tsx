"use client";

import { useEffect, useState } from "react";
import { FoodCreateFormFields } from "@/constants";
import PageLayout from "../components/PageLayout";
import FoodTable from "./FoodTable";
import { FoodCreateOrUpdateDrawer } from "@/components/drawers";
import useCreateFood from "@/api/food/useCreateFood";

const Food: React.FC = () => {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const { mutateAsync, isPending, isSuccess, error, reset } = useCreateFood();

  const foodCreateSubmitHandler = async (formData: FoodCreateFormFields) => {
    const {
      name,
      category,
      price,
      discount,
      stock,
      description,
      mainImage,
      subImages,
    } = formData;

    await mutateAsync({
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

  useEffect(() => {
    if (isSuccess) {
      toggleDrawer(false);
    }
  }, [isSuccess]);

  return (
    <>
      {isDrawerOpen && (
        <FoodCreateOrUpdateDrawer
          isDrawerOpen={isDrawerOpen}
          hideDrawer={() => {
            reset();
            toggleDrawer(false);
          }}
          foodCreateOrUpdateSubmitHandler={foodCreateSubmitHandler}
          apiError={error?.errorResponse?.message || error?.errorMessage}
        />
      )}

      <PageLayout
        title="Food Lists"
        addBtnText="Add Food"
        addBtnClickHandler={() => toggleDrawer(true)}
      >
        <FoodTable />
      </PageLayout>
    </>
  );
};

export default Food;
