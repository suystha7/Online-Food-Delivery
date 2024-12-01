"use client";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
}

const initialCategoriesData: Category[] = Array.from(
  { length: 10 },
  (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
    imageUrl: `https://via.placeholder.com/50?text=C${i + 1}`,
    createdAt: new Date().toISOString().split("T")[0],
  })
);

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(
    initialCategoriesData
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set()
  );
  const [editMode, setEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedData = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "" || !newCategoryImage) return;
    const imageUrl = URL.createObjectURL(newCategoryImage);
    const newCategory: Category = {
      id: categories.length + 1,
      name: newCategoryName,
      imageUrl,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setNewCategoryName("");
    setNewCategoryImage(null);
    setCurrentPage(1);
  };

  const handleSelectCategory = (id: number) => {
    setSelectedCategories((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAllOnPage = () => {
    if (selectedCategories.size === paginatedData.length) {
      // Unselect all categories if all are selected
      setSelectedCategories(new Set());
    } else {
      // Select all categories on the current page
      const newSelectedCategories = new Set<number>();
      paginatedData.forEach((category) =>
        newSelectedCategories.add(category.id)
      );
      setSelectedCategories(newSelectedCategories);
    }
  };

  const handleDeleteSelected = () => {
    const updatedCategories = categories.filter((category) => {
      return (
        !selectedCategories.has(category.id) ||
        !paginatedData.includes(category)
      );
    });
    setCategories(updatedCategories);
    setSelectedCategories(new Set()); // Reset selected categories
  };

  const handleEditSelected = () => {
    if (selectedCategories.size === 1) {
      const categoryToEdit = categories.find((category) =>
        selectedCategories.has(category.id)
      );
      if (categoryToEdit) {
        setEditingCategory(categoryToEdit);
        setNewCategoryName(categoryToEdit.name);
        setNewCategoryImage(null);
        setEditMode(true);
      }
    } else {
      alert("Please select only one category to edit.");
    }
  };

  const handleUpdateCategory = () => {
    if (editingCategory && newCategoryName.trim() !== "") {
      const updatedCategories = categories.map((category) =>
        category.id === editingCategory.id
          ? {
              ...category,
              name: newCategoryName,
              imageUrl: newCategoryImage
                ? URL.createObjectURL(newCategoryImage)
                : category.imageUrl,
            }
          : category
      );
      setCategories(updatedCategories);
      setEditMode(false);
      setSelectedCategories(new Set());
      setNewCategoryName("");
      setNewCategoryImage(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 max-w-5xl mx-auto">
      {selectedCategories.size > 0 && !editMode && (
        <div className="flex justify-end gap-4 mb-6">
          {selectedCategories.size === 1 && (
            <Button onClick={handleEditSelected} className="btn-red">
              Edit
            </Button>
          )}
          <Button onClick={handleDeleteSelected} className="btn-red">
            {selectedCategories.size === 1 ? "Delete" : "Delete Multiple"}
          </Button>
        </div>
      )}

      {(editMode || selectedCategories.size === 0) && (
        <div className="flex items-center justify-end gap-4 mb-6 flex-col sm:flex-row">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border rounded px-6 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 sm:mb-0"
          />
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewCategoryImage(e.target.files?.[0] ?? null)}
              className="border rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={editMode ? handleUpdateCategory : handleAddCategory}
            className="btn-red"
          >
            {editMode || selectedCategories.size > 0 ? "Update" : "Add"}
          </button>
        </div>
      )}

      <div className="flex-grow">
        <table className="w-full mx-auto border-collapse border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-6 py-3 text-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.size === paginatedData.length}
                  onChange={handleSelectAllOnPage}
                  className="cursor-pointer"
                />
              </th>
              <th className="border px-6 py-3 text-center">S.N.</th>
              <th className="border px-6 py-3 text-center">Image</th>
              <th className="border px-6 py-3 text-center">Category Name</th>
              <th className="border px-6 py-3 text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((category, index) => (
              <tr key={category.id} className="border-b hover:bg-gray-50">
                <td className="border px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(category.id)}
                    onChange={() => handleSelectCategory(category.id)}
                    className="cursor-pointer"
                  />
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 mb-4">
        <Button
          className="px-4 py-2 bg-white mr-2 disabled:bg-gray-300"
          disabled={currentPage === 1 || categories.length === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </Button>
        <span className="px-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="px-4 py-2 bg-white ml-2 disabled:bg-gray-300"
          disabled={currentPage === totalPages || categories.length === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default Category;
