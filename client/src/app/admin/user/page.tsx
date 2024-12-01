"use client";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  avatarUrl: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
}

// Mock Data for Users
const usersData: User[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  avatarUrl: `https://via.placeholder.com/50?text=U${i + 1}`,
  fullName: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phoneNumber: `+123456789${i + 1}`,
  role: i % 2 === 0 ? "Admin" : "User", // Alternating roles for demonstration
  isEmailVerified: i % 2 === 0,
  createdAt: new Date().toISOString().split("T")[0],
}));

const UserTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(usersData.length / itemsPerPage);
  const paginatedData = usersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <table className="w-[80%] border-collapse border mx-auto mt-16">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-4 py-2">S.N.</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Verified</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {paginatedData.map((user, index) => (
            <tr key={user.id}>
              <td className="border px-4 py-2 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border px-4 py-2 text-center">
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-12 h-12 object-cover rounded-full mx-auto"
                />
              </td>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNumber}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2 text-center">
                {user.isEmailVerified ? "Yes" : "No"}
              </td>
              <td className="border px-4 py-2 text-center">{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4 mb-4">
        <Button
          className="px-4 py-2 bg-white mr-2 disabled:bg-gray-300"
          disabled={currentPage === 1 || usersData.length === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </Button>
        <span className="px-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="px-4 py-2 bg-white ml-2 disabled:bg-gray-300"
          disabled={currentPage === totalPages || usersData.length === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default UserTable;
