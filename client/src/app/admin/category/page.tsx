"use client";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
}

// Mock Data with Image URLs (You can replace this with an actual backend call if needed)
const initialCategoriesData: Category[] = Array.from({ length: 0 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  imageUrl: `https://via.placeholder.com/50?text=C${i + 1}`,
  createdAt: new Date().toISOString().split("T")[0],
}));

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(
    initialCategoriesData
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [newCategoryName, setNewCategoryName] = useState(""); // State for the input field
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null); // State for the image file
  const itemsPerPage = 8;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedData = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle adding a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim() === "" || !newCategoryImage) return; // Don't add if the input is empty or no image selected

    // Create an image URL for the uploaded image
    const imageUrl = URL.createObjectURL(newCategoryImage);

    const newCategory: Category = {
      id: categories.length + 1, // Assigning a new ID based on the current length
      name: newCategoryName,
      imageUrl, // Use the generated image URL
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCategories((prevCategories) => [...prevCategories, newCategory]);

    setNewCategoryName(""); // Clear the input field
    setNewCategoryImage(null); // Clear the selected image
    setCurrentPage(1); // Reset the page to 1 to show the new category on the first page
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Add Category Form */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)} // Update the input value
          className="border rounded px-6 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewCategoryImage(e.target.files?.[0] ?? null)} // Set the selected image
          className="border rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleAddCategory}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Add
        </button>
      </div>

      {/* Categories Table */}
      <div className="flex-grow">
        <table className="w-[60%] mx-auto border-collapse border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3 text-left">S.N.</th>
              <th className="border px-6 py-3 text-left">Image</th>
              <th className="border px-6 py-3 text-left">Category Name</th>
              <th className="border px-6 py-3 text-left">Created At</th>
              <th className="border px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((category, index) => (
              <tr key={category.id} className="border-b hover:bg-gray-50">
                <td className="border px-6 py-4 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="border px-6 py-4 text-center">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-14 h-14 object-cover mx-auto"
                  />
                </td>
                <td className="border px-6 py-4">{category.name}</td>
                <td className="border px-6 py-4">{category.createdAt}</td>
                <td className="flex items-center justify-center px-4 py-2 text-center mt-6">
                  <div className="relative group">
                    <button className="text-green-600 mr-2">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                      Edit
                    </div>
                  </div>

                  <div className="relative group">
                    <button className="text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 mb-4">
        <Button
          className="px-4 py-2 bg-white mr-2 disabled:bg-gray-300"
          disabled={currentPage === 1 || categories.length === 0} // Disable if no categories
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </Button>
        <span className="px-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="px-4 py-2 bg-white   ml-2 disabled:bg-gray-300"
          disabled={currentPage === totalPages || categories.length === 0} // Disable if no categories
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default Category;
