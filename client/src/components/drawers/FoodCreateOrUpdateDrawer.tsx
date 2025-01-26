"use client";

import {
  Input,
  Drawer,
  ErrorMessage,
  Button,
  FileInput,
  ControlledSelect,
  TextArea,
} from "../basic";
import {
  ALLOWED_IMAGE_FILE_TYPES,
  BUTTON_TYPES,
  FoodCreateFormFields,
  SelectOptionType,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Food } from "@/api/food/FoodTypes";
import { foodCreateValidationSchema } from "@/schema/foodCreate.schema";
import useGetAllCategories from "@/api/category/useGetAllCategories";
import { getCapitalizedForm } from "@/utils/helpers";

interface FoodCreateOrUpdateDrawerProps {
  isDrawerOpen: boolean;
  hideDrawer(): void;
  foodCreateOrUpdateSubmitHandler: (formData: FoodCreateFormFields) => void;
  apiError?: string;
  isLoading?: boolean;
  food?: Food;
  isUpdateMode?: boolean;
}
const FoodCreateOrUpdateDrawer = (props: FoodCreateOrUpdateDrawerProps) => {
  const {
    isDrawerOpen,
    hideDrawer,
    foodCreateOrUpdateSubmitHandler,
    apiError = "",
    isLoading = false,
    food,
    isUpdateMode = false,
  } = props;

  const { data } = useGetAllCategories({ page: 1, limit: 0 });

  const categoryOptions: Array<SelectOptionType<string>> = data
    ? data.categories.map((category) => {
        return {
          label: getCapitalizedForm({ sentence: category.name }),
          value: category._id,
        };
      })
    : [];

  const categoryDataObject = (categoryOptions ?? []).reduce<
    Record<string, string>
  >((res, { label, value }) => {
    res[value] = label;
    return res;
  }, {} as Record<string, string>);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<FoodCreateFormFields>({
    resolver: zodResolver(foodCreateValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      name: isUpdateMode
        ? getCapitalizedForm({ sentence: food?.name || "" })
        : "",
      category: isUpdateMode
        ? {
            label: getCapitalizedForm({
              sentence: categoryDataObject[food!.category],
            }),
            value: food?.category,
          }
        : null,
      description: isUpdateMode ? food?.description : "",
      price: isUpdateMode ? food?.price.toString() : "",
      stock: isUpdateMode ? food?.stock.toString() : "",
      discount: isUpdateMode ? food?.discount.toString() : "",
    },
  });

  return (
    <>
      <Drawer
        isDrawerOpen={isDrawerOpen}
        heading={`${isUpdateMode ? "Update Food" : "Create Food"}`}
        hideDrawer={() => {
          reset();
          hideDrawer();
        }}
      >
        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSubmit(foodCreateOrUpdateSubmitHandler)}
        >
          {apiError && <ErrorMessage message={apiError} className="text-sm" />}

          <Input
            type="text"
            label="Name"
            placeholder={"Enter food name"}
            errorMessage={errors.name?.message || ""}
            {...register("name")}
          />

          <ControlledSelect<
            FoodCreateFormFields,
            SelectOptionType<string>,
            false
          >
            name="category"
            control={control}
            label="Category"
            placeholder="Select Category"
            options={categoryOptions}
            isDisabled={isUpdateMode}
          />

          {/* <Input
            type="text"
            label="Description"
            placeholder={"Enter food description"}
            errorMessage={errors.description?.message || ""}
            {...register("description")}
          /> */}

          <TextArea
            label="Description"
            placeholder={"Enter food description"}
            errorMessage={errors.description?.message || ""}
            {...register("description")}
          />

          <Input
            type="number"
            label="Price"
            placeholder={"Enter food price"}
            errorMessage={errors.price?.message || ""}
            {...register("price")}
          />

          <Input
            type="number"
            label="Stock"
            placeholder={"Enter food stock"}
            errorMessage={errors.stock?.message || ""}
            {...register("stock")}
          />

          <Input
            type="number"
            label="Discount"
            placeholder={"Enter food discount"}
            isRequired={false}
            errorMessage={errors.discount?.message || ""}
            {...register("discount")}
          />

          <FileInput
            label="Main Image"
            errorMessage={errors.mainImage?.message || ""}
            register={register("mainImage")}
            accept={ALLOWED_IMAGE_FILE_TYPES.toString()}
          />

          <FileInput
            label="Sub Images"
            errorMessage={errors.subImages?.message || ""}
            register={register("subImages")}
            accept={ALLOWED_IMAGE_FILE_TYPES.toString()}
            isMultiple={true}
            isRequired={false}
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

export default FoodCreateOrUpdateDrawer;
