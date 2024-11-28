"use client";
import { Pencil, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  discount: number;
  mainImage: string;
  price: number;
  stock: number;
  date: string;
  addedBy: string;
}

const mockProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  category: "Category",
  description: `Description for Product ${index + 1}`,
  discount: 0,
  mainImage: "https://via.placeholder.com/80",
  price: Math.floor(Math.random() * 10000) + 1,
  stock: Math.floor(Math.random() * 100),
  date: "2024-11-28",
  addedBy: "admin",
}));

const ProductTable: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold pl-5">Products Details</h1>
        <button className="btn-red text-white px-6 py-2 rounded">
          Add Product
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-4 py-2 text-center">S.N.</th>
            <th className="border px-4 py-2 text-center">Image</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2 text-center">Price</th>
            <th className="border px-4 py-2 text-center">Category</th>
            <th className="border px-4 py-2 text-center">Date</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {paginatedData.map((product, index) => (
            <tr key={product.id}>
              <td className="border px-4 py-2 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border px-4 py-2 text-center">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <div>
                  <span className="font-semibold">{product.name}</span>
                  {/* <div className="text-sm text-green-600">Added by: {product.addedBy}</div>F */}
                </div>
              </td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2 text-center">
                Rs.{product.price.toLocaleString()}
              </td>
              <td className="border px-4 py-2 text-center">
                {product.category}
              </td>
              <td className="border px-4 py-2 text-center">{product.date}</td>
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

export default ProductTable;
