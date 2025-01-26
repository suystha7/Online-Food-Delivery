import { BUTTON_TYPES } from "@/constants";
import { Button, ErrorMessage, Modal } from "../basic";

interface IDeleteModalProps {
  heading?: string;
  isLoading?: boolean;
  apiError?: string;
  deleteHandler: () => void;
  cancelHandler: () => void;
}

export default function DeleteModal(props: IDeleteModalProps) {
  const {
    heading,
    isLoading = false,
    apiError = "",
    deleteHandler,
    cancelHandler,
  } = props;

  return (
    <Modal
      className="px-8 py-6 w-[75%] md:w-2/4 lg:w-1/4"
      hideModal={cancelHandler}
    >
      <div>
        {apiError && <ErrorMessage message={apiError} />}

        <span className="block text-center text-xl mb-4">
          {heading ?? "Do you want to delete this item?"}
        </span>

        <div className="flex justify-between gap-3">
          <Button
            className=" bg-red-500 flex-1"
            isLoading={isLoading}
            onClickHandler={deleteHandler}
          >
            <span className="text-white">OK</span>
          </Button>

          <Button
            buttonType={BUTTON_TYPES.secondaryButton}
            className="flex-1"
            onClickHandler={cancelHandler}
          >
            <span className="text-black">Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
