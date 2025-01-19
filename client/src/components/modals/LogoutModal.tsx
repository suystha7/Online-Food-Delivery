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

        <h3 className="text-center text-xl mb-4">Do you want to logout?</h3>

        <div className="flex flex-col gap-3">
          <Button
            className=" bg-red-500"
            isLoading={isLoading}
            onClickHandler={logoutSubmitHandler}
          >
            <span className="text-white">Yes</span>
          </Button>

          <Button
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
