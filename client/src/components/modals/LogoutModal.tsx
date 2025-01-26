"use client";

import { BUTTON_TYPES } from "@/constants";
import { Button, ErrorMessage, Modal } from "../basic";

interface ILogoutModalProps {
  logoutSubmitHandler: () => void;
  error?: string;
  isLoading?: boolean;
  cancelHandler: () => void;
}

export default function LogoutModal(props: ILogoutModalProps) {
  const {
    logoutSubmitHandler,
    error = "",
    isLoading = false,
    cancelHandler,
  } = props;

  return (
    <Modal className="px-8 py-6 w-[95%] lg:w-1/4" hideModal={cancelHandler}>
      <div>
        {error && <ErrorMessage message={error} />}

        <span className="block text-center text-xl mb-4">Do you want to logout?</span>

        <div className="flex justify-between gap-3">
          <Button
            className=" bg-red-500 flex-1"
            isLoading={isLoading}
            onClickHandler={logoutSubmitHandler}
          >
            <span className="text-white">Yes</span>
          </Button>

          <Button
            className="flex-1"
            buttonType={BUTTON_TYPES.secondaryButton}
            onClickHandler={cancelHandler}
          >
            <span className="text-black">No</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
