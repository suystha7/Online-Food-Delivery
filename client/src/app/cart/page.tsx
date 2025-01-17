"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For navigation in Next.js
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@mui/material";

const Cart: React.FC = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Classic Burger",
      price: 280,
      image: "/img1.png",
      qty: 1,
      stock: 5,
    },
    {
      id: 2,
      name: "Chicken Burger",
      price: 300,
      image: "/img1.png",
      qty: 1,
      stock: 3,
    },
  ]);

  const increment = (id: number) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id && item.qty < item.stock
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decrement = (id: number) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = categories.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="p-5 max-w-7xl mx-auto my-24">
      {categories.length > 0 ? (
        <>
          {/* Cart header */}
          <div className="my-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
            <p className="text-gray-600 text-base">
              There are{" "}
              <span className="text-red-600 font-semibold">
                {categories.length}
              </span>{" "}
              products in your cart.
            </p>
          </div>

          {/* Flex container for cart items and order summary */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="w-full md:w-2/3">
              <table className="w-full table-auto border-collapse border border-gray-300 text-sm text-left bg-white overflow-hidden">
                <thead className="bg-gray-100 text-center ">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      S.N.
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      Image
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      Product Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      Unit Price
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      Quantity
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id} className="border-t text-center">
                      <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={`Category ${category.id}`}
                            width={70}
                            height={70}
                            className="rounded-md object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-md">
                            C{category.id}
                          </div>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-red-700 font-bold text-lg">
                        {category.name}
                        <p className="text-sm text-gray-700 my-3">
                          Stock: {category.stock}
                        </p>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-700 text-base">
                        Rs.{category.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        <div className="flex items-center gap-2 justify-center">
                          <Button
                            onClick={() => decrement(category.id)}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-black"
                          >
                            <Minus size={16} />
                          </Button>
                          <input
                            type="number"
                            value={category.qty}
                            readOnly
                            className="w-12 text-center border border-gray-300 rounded-md py-1"
                          />
                          <Button
                            onClick={() => increment(category.id)}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-black"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        <div className="relative group">
                          <button
                            onClick={() => deleteItem(category.id)}
                            className="text-red-600"
                          >
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

            <div className="w-full md:w-1/3 bg-white p-6">
              <h3 className="text-xl font-semibold mb-4 pb-3 text-gray-800 border-b border-gray-400">
                Order Summary
              </h3>
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-800 font-medium">Rs. {subtotal}</p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Tax (10%)</p>
                <p className="text-gray-800 font-medium">
                  Rs. {tax.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Total</p>
                <p className="text-gray-800 font-bold text-lg">
                  Rs. {total.toFixed(2)}
                </p>
              </div>
              <Button
                onClick={() => router.push("/shippingDetails")}
                className="btn-red"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      ) : (
        // Empty cart message and redirect button
        <div className="text-center my-20">
          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mt-2">
            Looks like you havent added anything to your cart yet.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-5 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
          >
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
