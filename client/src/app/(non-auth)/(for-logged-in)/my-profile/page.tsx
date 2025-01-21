"use client";

import { ProfileModal } from "@/components/modals";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const router = useRouter();

  const cancelHandler = () => {
    router.back();
  };

  return (
    <div>
      <ProfileModal cancelHandler={cancelHandler} />
    </div>
  );
}
