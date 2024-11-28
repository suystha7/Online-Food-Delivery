"use client";
import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";
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
const usersData: User[] = Array.from({ length: 20 }, (_, i) => ({
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
      <div className="flex items-center justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="User name"
          className="border rounded px-6 py-2 w-64 outline-red-600"
        />
        <button className="btn-red text-white px-6 py-2 rounded">Add User</button>
      </div>

      <table className="w-[80%] border-collapse border mx-auto">
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
            <th className="border px-4 py-2">Actions</th>
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
              <td className="border px-4 py-2 text-center">
                <button className="text-green-600 mr-2">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="text-red-600">
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-50 rounded-full mr-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-50 rounded-full ml-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default UserTable;
