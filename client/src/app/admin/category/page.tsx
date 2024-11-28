"use client";
import { ChevronLeft, ChevronRight, Pencil, Trash } from "lucide-react";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
}

// Mock Data with Image URLs
const categoriesData: Category[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  imageUrl: `https://via.placeholder.com/50?text=C${i + 1}`,
  createdAt: new Date().toISOString().split("T")[0],
}));

const Category: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(categoriesData.length / itemsPerPage);
  const paginatedData = categoriesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Category Name"
          className="border rounded px-6 py-2 w-64 outline-red-600"
        />
        <button className="btn-red text-white px-6 py-2 rounded">Add</button>
      </div>

      <table className="w-[60%] border-collapse border ml-[18%] ">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-4 py-2">S.N.</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Category Name</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {paginatedData.map((category, index) => (
            <tr key={category.id}>
              <td className="border px-4 py-2 w-0 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border px-4 py-2 text-center w-32">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-50 h-50 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2 w-32">{category.createdAt}</td>
              <td className="border px-4 py-2 w-20">
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

export default Category;
