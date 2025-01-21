"use client";

import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import { useEffect } from "react";
import { Modal } from "../basic";

interface IProfileModalProps {
  cancelHandler: () => void;
}

export default function ProfileModal(props: IProfileModalProps) {
  const { cancelHandler } = props;

  const { data: user, isSuccess } = useGetCurrentUser();

  useEffect(() => {}, [isSuccess]);

  return (
    <Modal
      heading="My Profile"
      className="px-8 py-6 w-[95%] lg:w-1/4"
      hideModal={cancelHandler}
    >
      <div className="space-y-4">
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={user?.avatar?.url || "./profile-user.png"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-4">
          <span className="font-bold">User ID: </span>
          <span>{user?._id}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Full Name: </span>
          <span>{user?.fullName}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Email: </span>
          <span>{user?.email}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Role: </span>
          <span>{user?.role}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Phone Number: </span>
          <span>{user?.phoneNumber || "N/A"}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Joined at: </span>
          <span>
            {user?.createdAt ? new Date(user.createdAt).toDateString() : "N/A"}
          </span>
        </div>
      </div>
    </Modal>
  );
}
