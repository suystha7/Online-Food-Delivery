"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For navigation in Next.js
import { Minus, Plus, Trash2 } from "lucide-react";
import useGetCart from "@/api/cart/useGetCart";
import { getAmountWithNepaliCurrency } from "@/utils/helpers";
import useAddOrUpdateCartItemQuantity from "@/api/cart/useAddOrUpdateCartItemQuantity";
import useDeleteCartItem from "@/api/cart/useDeleteCartItem";
import { BUTTON_TYPES, DELIVERY_CHARGES, ROUTE_PATHS } from "@/constants";
import { Button } from "@/components/basic";

const Cart: React.FC = () => {
  const router = useRouter();

  const {
    data,
    isPending: isDataPending,
    isSuccess: isDataSuccess,
    isError: isDataError,
    error: dataError,
  } = useGetCart();

  const { mutateAsync } = useAddOrUpdateCartItemQuantity();

  const { mutateAsync: deleteCartItem } = useDeleteCartItem();

  const [cartItemsArr, setCartItemsArr] = useState<Record<string, number>>({});

  // const [totalPrice, setTotalPrice] = useState<number>(0);

  const cartRef = useRef(cartItemsArr);

  // const dataRef = useRef(data);

  useEffect(() => {
    if (isDataSuccess) {
      // setTotalPrice(data.cartTotal);

      setCartItemsArr(
        data?.items.reduce<Record<string, number>>(
          (res, { food, quantity }) => {
            res[food._id] = quantity;
            return res;
          },
          {} as Record<string, number>
        )
      );
    }
  }, [data, isDataSuccess]);

  useEffect(() => {
    cartRef.current = cartItemsArr;
  }, [cartItemsArr]);

  // useEffect(() => {
  //   dataRef.current = data;
  // }, [data]);

  // const updateCart = () => {
  //   // console.log(dataRef.current);
  //   // console.log(cartRef.current);
  //   dataRef.current?.items.forEach(async (item) => {
  //     if (item.quantity !== cartRef.current[item.food._id]) {
  //       await mutateAsync({
  //         foodId: item.food._id,
  //         quantity: cartRef.current[item.food._id],
  //       });
  //     }
  //   });
  // };

  // useEffect(() => {
  //   return () => {
  //     console.log("hello");

  //     updateCart();
  //   };
  // }, []);

  // // window.addEventListener("beforeunload", () => {
  // //   updateCart();
  // // });

  // const updateFoodQuantity = ({
  //   foodId,
  //   isIncrement,
  // }: {
  //   foodId: string;
  //   isIncrement: boolean;
  // }) => {
  //   const change = isIncrement ? 1 : -1;
  //   setCartItemsArr((prev) => ({
  //     ...prev,
  //     [foodId]: prev[foodId] + change,
  //   }));

  //   setTotalPrice(
  //     data!.items.reduce((total, { food, quantity }) => {
  //       total +=
  //         food._id === foodId
  //           ? (cartItemsArr[food._id] + change) * food.price
  //           : cartItemsArr[food._id] * food.price;
  //       return total;
  //     }, 0)
  //   );
  // };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    return function (this: any, ...args: any[]) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const updateFoodQuantity = async ({ foodId }: { foodId: string }) => {
    await mutateAsync({
      foodId,
      quantity: cartRef.current[foodId],
    });
  };

  const deleteCartItemHandler = async ({ foodId }: { foodId: string }) => {
    await deleteCartItem({
      foodId,
    });
  };

  const debouncedClick = debounce(updateFoodQuantity, 1000);

  if (isDataPending) {
    return <span>Loading...</span>;
  }

  if (isDataError) {
    return (
      <span>{dataError.errorResponse?.message || dataError.errorMessage}</span>
    );
  }

  return (
    <div className="p-5 max-w-7xl mx-auto my-24">
      {data?.items.length > 0 ? (
        <>
          {/* Cart header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
            <p className="text-gray-600 text-base">
              There {data.items.length > 1 ? "are" : "is"}&nbsp;
              <span className="text-red-600 font-semibold">
                {data.items.length}&nbsp;
              </span>
              food {data.items.length > 1 ? "items" : "item"} in your cart.
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
                      Food Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold text-gray-700 text-base">
                      Image
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
                  {data.items.map((item, index) => (
                    <tr key={item.food._id} className="border-t font-medium">
                      <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                        {index + 1}.
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-accent text-lg">
                        {item.food.name}
                        {/* <p className="text-sm text-gray-700 my-3">
                          Stock: {item.food.stock}
                        </p> */}
                      </td>

                      <td className="w-[48px] border border-gray-300 px-4 py-2">
                        <img
                          src={item.food.mainImage.url}
                          alt={`Food Image`}
                          className="aspect-square rounded-md object-cover"
                        />
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-gray-700 text-base">
                        {getAmountWithNepaliCurrency({
                          amount: item.food.price,
                        })}
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-gray-700">
                        <div className="flex items-center gap-2 justify-center">
                          <Button
                            isDisabled={cartItemsArr[item.food._id] === 1}
                            onClickHandler={() => {
                              setCartItemsArr((prev) => ({
                                ...prev,
                                [item.food._id]: prev[item.food._id] - 1,
                              }));
                              debouncedClick({
                                foodId: item.food._id,
                              });
                            }}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-black"
                          >
                            <Minus size={16} />
                          </Button>
                          <input
                            type="number"
                            value={cartItemsArr[item.food._id] || 1}
                            readOnly
                            className="w-12 text-center border border-gray-300 rounded-md py-1"
                          />
                          <Button
                            isDisabled={
                              cartItemsArr[item.food._id] === item.food.stock
                            }
                            onClickHandler={() => {
                              setCartItemsArr((prev) => ({
                                ...prev,
                                [item.food._id]: prev[item.food._id] + 1,
                              }));
                              debouncedClick({
                                foodId: item.food._id,
                              });
                            }}
                            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md text-black"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center">
                        <div className="relative group">
                          <button
                            onClick={() =>
                              deleteCartItemHandler({ foodId: item.food._id })
                            }
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
                <p className="text-gray-600">Food total</p>
                <p className="text-gray-800 font-medium">
                  {getAmountWithNepaliCurrency({ amount: data.cartTotal })}
                </p>
              </div>

              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Delivery Charges</p>
                <p className="text-gray-800 font-medium">
                  {getAmountWithNepaliCurrency({ amount: DELIVERY_CHARGES })}
                </p>
              </div>

              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-600">Total</p>
                <p className="text-gray-800 font-medium">
                  {getAmountWithNepaliCurrency({
                    amount: data.cartTotal + DELIVERY_CHARGES,
                  })}
                </p>
              </div>

              {/* <div className="flex justify-between items-center mb-1">
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
              </div> */}

              <Button
                buttonType={BUTTON_TYPES.redButton}
                onClickHandler={() => router.push(ROUTE_PATHS.shipping)}
                className="mt-2"
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
            Looks like you haven't added anything to your cart yet.
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
