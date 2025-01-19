"use client";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Image {
  url: string;
  alt?: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  mainImage: Image;
  subImages: Image[];
  stock: number;
}

interface FormInputs {
  name: string;
  category: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  mainImage: string;
  subImages: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (product: Product | null) => {
    setSelectedProduct(product);

    if (product) {
      // Populate the form with the product's data
      setValue("name", product.name);
      setValue("category", product.category);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("discount", product.discount);
      setValue("stock", product.stock);
      setValue("mainImage", product.mainImage.url);
      setValue("subImages", product.subImages.map((img) => img.url).join(", "));
    } else {
      reset(); // Clear the form for adding a new product
    }

    setIsModalOpen(true);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const updatedProduct: Product = {
      id: selectedProduct ? selectedProduct.id : products.length + 1,
      mainImage: { url: data.mainImage, alt: `${data.name} main image` },
      subImages: data.subImages
        ? data.subImages.split(",").map((url) => ({ url: url.trim() }))
        : [],
      name: data.name,
      category: data.category,
      description: data.description,
      price: data.price,
      discount: data.discount || 0,
      stock: data.stock || 0,
    };

    if (selectedProduct) {
      // Edit mode: update the product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id ? updatedProduct : product
        )
      );
    } else {
      // Add mode: add a new product
      setProducts((prev) => [...prev, updatedProduct]);
    }

    reset();
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const toggleSelectProduct = (productId: number) => {
    setSelectedProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
      } else {
        updated.add(productId);
      }
      return updated;
    });
  };

  const handleDeleteSelected = () => {
    setProducts((prevProducts) =>
      prevProducts.filter((product, index) => {
        const pageStartIndex = (currentPage - 1) * itemsPerPage;
        const pageEndIndex = currentPage * itemsPerPage;
        const isProductOnCurrentPage =
          index >= pageStartIndex && index < pageEndIndex;
        return !(isProductOnCurrentPage && selectedProducts.has(product.id));
      })
    );
    setSelectedProducts(new Set());
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const currentPageIds = new Set(
        paginatedData.map((product) => product.id)
      );
      setSelectedProducts(currentPageIds);
    } else {
      setSelectedProducts(new Set());
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold pl-5">Products Details</h1>
        {selectedProducts.size > 0 ? (
          <div className="flex gap-4">
            {selectedProducts.size === 1 && (
              <Button
                className="btn-red"
                onClick={() => {
                  const productId = Array.from(selectedProducts)[0];
                  const productToEdit = products.find(
                    (product) => product.id === productId
                  );
                  if (productToEdit) {
                    openModal(productToEdit);
                  }
                }}
              >
                Edit
              </Button>
            )}
            <Button className="btn-red" onClick={handleDeleteSelected}>
              {selectedProducts.size > 1 ? "Delete Multiple" : "Delete"}
            </Button>
          </div>
        ) : (
          <button
            className="btn-red text-white px-6 py-2 rounded"
            onClick={() => openModal(null)}
          >
            Add Product
          </button>
        )}
      </div>

      <div className="flex-grow overflow-x-auto">
        <table className="border-collapse border text-center w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={
                    selectedProducts.size === paginatedData.length &&
                    paginatedData.length > 0
                  }
                />
              </th>
              <th className="border px-4 py-2">S.N.</th>
              <th className="border px-4 py-2">Main Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Discount</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No products available.
                </td>
              </tr>
            ) : (
              paginatedData.map((product, index) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={() => toggleSelectProduct(product.id)}
                      checked={selectedProducts.has(product.id)}
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="border px-4 py-2">
                    <img
                      src={product.mainImage.url}
                      alt={product.mainImage.alt || "Main Image"}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">Rs.{product.price}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2">{product.stock}</td>
                  <td className="border px-4 py-2">{product.discount}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4 mb-4">
        <Button
          className="px-4 py-2 bg-white mr-2 disabled:bg-gray-300"
          disabled={currentPage === 1 || paginatedData.length === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeft />
        </Button>
        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="px-4 py-2 bg-white ml-2 disabled:bg-gray-300"
          disabled={currentPage === totalPages || paginatedData.length === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <ChevronRight />
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Left Column */}
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="border w-full p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="border w-full p-2 mt-2"
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home-appliances">Home Appliances</option>
                  <option value="books">Books</option>
                  {/* Add more categories here as needed */}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  {...register("description", { required: true })}
                  className="border w-full p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="border w-full p-2 mt-2"
                />
              </div>

              {/* Right Column */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Discount</label>
                <input
                  {...register("discount", { required: false })}
                  type="number"
                  className="border w-full p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Stock</label>
                <input
                  {...register("stock", { required: true })}
                  type="number"
                  className="border w-full p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Main Image URL
                </label>
                <input
                  {...register("mainImage", { required: true })}
                  className="border w-full p-2 mt-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Sub Image URLs (comma-separated)
                </label>
                <input
                  {...register("subImages")}
                  className="border w-full p-2 mt-2"
                />
              </div>

              {/* Button Section */}
              <div className="flex justify-end col-span-2 gap-4">
                <Button
                  className="btn-red"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-red">
                  {selectedProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
