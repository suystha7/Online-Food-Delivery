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
      prevProducts.filter((product) => !selectedProducts.has(product.id))
    );
    setSelectedProducts(new Set());
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

      <div className="flex-grow">
        <table className="border-collapse border text-center w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedProducts(
                        new Set(products.map((product) => product.id))
                      );
                    } else {
                      setSelectedProducts(new Set());
                    }
                  }}
                  checked={
                    selectedProducts.size === products.length &&
                    products.length > 0
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
          disabled={currentPage === 1 || products.length === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </Button>
        <span className="px-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="px-4 py-2 bg-white ml-2 disabled:bg-gray-300"
          disabled={currentPage === totalPages || products.length === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-gray-700">Title</label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded"
                    placeholder="Enter product title"
                    {...register("name", {
                      required: "Title is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700">Category</label>
                  <select
                    className="px-4 py-2 border rounded"
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="text-gray-700">Description</label>
                  <textarea
                    className="px-4 py-2 border rounded"
                    placeholder="Enter product description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="text-gray-700">Main Image URL</label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded"
                    placeholder="Enter main image URL"
                    {...register("mainImage", {
                      required: "Main image is required",
                    })}
                  />
                  {errors.mainImage && (
                    <p className="text-red-600 text-sm">
                      {errors.mainImage.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="text-gray-700">
                    Sub Images (comma separated URLs)
                  </label>
                  <input
                    type="text"
                    className="px-4 py-2 border rounded"
                    placeholder="Enter sub images URLs"
                    {...register("subImages")}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700">Price</label>
                  <input
                    type="number"
                    className="px-4 py-2 border rounded"
                    placeholder="Enter product price"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700">Discount (%)</label>
                  <input
                    type="number"
                    className="px-4 py-2 border rounded"
                    placeholder="Enter discount (optional)"
                    {...register("discount", { valueAsNumber: true })}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700">Stock</label>
                  <input
                    type="number"
                    className="px-4 py-2 border rounded"
                    placeholder="Enter stock quantity"
                    {...register("stock", { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <Button
                  type="button"
                  className="px-6 py-2 bg-gray-300 rounded text-black"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-red">
                  Save Product
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
