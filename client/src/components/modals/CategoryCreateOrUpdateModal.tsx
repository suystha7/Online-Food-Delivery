import { Category } from "@/api/category/CategoryTypes";
import { Input, Modal, ErrorMessage, Button, FileInput } from "../basic";
import {
  ALLOWED_IMAGE_FILE_TYPES,
  BUTTON_TYPES,
  CategoryCreateFormFields,
} from "@/constants";
import { categoryCreateValidationSchema } from "@/schema/categoryCreate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CategoryCreateOrUpdateModalProps {
  hideModal(): void;
  categoryCreateOrUpdateSubmitHandler: (
    formData: CategoryCreateFormFields
  ) => void;
  apiError?: string;
  isLoading?: boolean;
  category?: Category;
  isUpdateMode?: boolean;
}
const CategoryCreateOrUpdateModal = (
  props: CategoryCreateOrUpdateModalProps
) => {
  const {
    hideModal,
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
  } = useForm<CategoryCreateFormFields>({
    resolver: zodResolver(categoryCreateValidationSchema),
    shouldFocusError: false,
  });

  return (
    <>
      <Modal
        heading={`${isUpdateMode ? "Update Category" : "Create Category"}`}
        className="px-8 py-4 w-[95%] lg:w-1/3"
        hideModal={hideModal}
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

          {/* <Input
            type="file"
            label="Image"
            errorMessage={errors.mainImage?.message || ""}
            {...register("mainImage")}
          /> */}

          <FileInput
            label="Image"
            errorMessage={errors.mainImage?.message || ""}
            register={register("mainImage")}
            accept={ALLOWED_IMAGE_FILE_TYPES.toString()}
          />

          <div className="flex flex-col gap-y-4">
            <Button
              type="submit"
              buttonType={BUTTON_TYPES.primaryButton}
              onClickHandler={() => {}}
              className="uppercase px-12 py-1"
              isLoading={isLoading}
            >
              {isUpdateMode ? <span>Update</span> : <span>Create</span>}
            </Button>

            <Button
              buttonType={BUTTON_TYPES.secondaryButton}
              onClickHandler={hideModal}
              className="uppercase px-12 py-1"
              isDisabled={isLoading}
            >
              <span>Cancel</span>
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CategoryCreateOrUpdateModal;
