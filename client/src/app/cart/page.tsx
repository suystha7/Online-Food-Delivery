"use client";
import { Button, Rating } from "@mui/material";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Cart = () => {
  const [qty, setQty] = useState<number>(1);
  const plus = () => {
    setQty(qty + 1);
  };

  const minus = () => {
    if (qty === 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
  };
  return (
    <div className="cartPage py-5">
      <section className="max-w-7xl mx-auto mt-40 ">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <p>
          There are{" "}
          <span className="text-red-600 font-semibold text-base">1</span>{" "}
          products in your cart
        </p>

        <div className="flex items-center">
          <div className="overflow-x-auto w-[75%]">
            <table className="min-w-full table-auto border-separate border-spacing-0">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Subtotal
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center justify-start gap-1">
                      <div className="imgWrapper w-[100px] h-[100px] overflow-hidden rounded-md ">
                        <Link href="#">
                          <Image
                            src="/img1.png"
                            alt="img"
                            width={100}
                            height={100}
                          />
                        </Link>
                      </div>

                      <div className="info">
                        <Link
                          href="#"
                          className="font-bold text-black hover:text-red-700"
                        >
                          <h3 className="font-bold from-neutral-700">
                            Classic Burgers
                          </h3>
                        </Link>
                        <Rating
                          name="simple-controlled"
                          value={4}
                          readOnly
                          size="medium"
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <p className="text-lg ml-3">Rs. 280</p>
                  </td>

                  <td>
                    <div className="qtyDrop flex items-center gap-4">
                      <Button className="action" onClick={plus}>
                        <Plus />
                      </Button>
                      <input
                        type="number"
                        value={qty}
                        readOnly
                        className="qty-input"
                      />
                      <Button className="action" onClick={minus}>
                        <Minus />
                      </Button>
                    </div>
                  </td>

                  <td>
                    <p className="text-lg ml-3">Rs. 280</p>
                  </td>

                  <td>
                    <p className="text-lg ml-3">X</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
