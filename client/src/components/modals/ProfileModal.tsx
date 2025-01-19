"use client";

import { useEffect } from "react";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import { Modal } from "../basic";

export default function ProfileModal() {
  const { data: user, isSuccess } = useGetCurrentUser();

  // console.log("user", user);

  useEffect(() => {
    // Additional logic to handle the user data if needed
  }, [isSuccess]);

  return (
    <Modal heading="My Profile" className="px-8 py-6 w-[95%] lg:w-1/4">
      <div className="space-y-4">
        <div className="mb-4 flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={user?.avatar?.url}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-4">
          <span className="font-bold">User ID: </span>
          <span>{user?._id || "N/A"}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Role: </span>
          <span>{user?.role || "N/A"}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Full Name: </span>
          <span>{user?.fullName || "N/A"}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Email: </span>
          <span>{user?.email || "N/A"}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Phone Number: </span>
          <span>{user?.phoneNumber || "N/A"}</span>
        </div>

        <div className="mb-4">
          <span className="font-bold">Email Verified? : </span>
          <span>{user?.isEmailVerified || "N/A"}</span>
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
