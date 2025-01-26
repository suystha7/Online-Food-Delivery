"use client";
import React, { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useGetFoodById from "@/api/food/useGetFoodById";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";
import { useParams, useRouter } from "next/navigation";
import useAddOrUpdateCartItemQuantity from "@/api/cart/useAddOrUpdateCartItemQuantity";
import Spinner from "@/components/icons/Spinner";
import { BUTTON_TYPES, ROUTE_PATHS } from "@/constants";
import useGetCart from "@/api/cart/useGetCart";
import { Button } from "@/components/basic";
import useCustomToast from "@/hooks/useCustomToast";
import useGetSimilarFoods from "@/api/recommended-foods/useGetSimilaryFood";
import FoodCard from "@/components/FoodCard";
import useGetAverageRating from "@/api/rating/useGetAverateRating";

const FoodDetails = () => {
  const params = useParams();

  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState<boolean>(false);

  const [isOutOfStock, setIsOutofStock] = useState<boolean>(false);

  const {
    data: food,
    isPending,
    error: foodError,
    isSuccess: isFoodSuccess,
  } = useGetFoodById({
    foodId: params.foodId as string,
  });

  const { data: cartData, isSuccess: isCartSuccess } = useGetCart();

  const {
    data: similarFoodsData,
    isPending: isSimilarFoodsPending,
    isSuccess: isSimilarFoodsSuccess,
  } = useGetSimilarFoods({ foodId: params.foodId as string });

  const { data: averageRatingData } = useGetAverageRating();

  const { mutateAsync, isSuccess, isError, error } =
    useAddOrUpdateCartItemQuantity();

  const router = useRouter();

  const toast = useCustomToast();

  useEffect(() => {
    if (isCartSuccess && isFoodSuccess) {
      setIsOutofStock(food.stock === 0);
      setAlreadyAddedToCart(
        cartData.items.map((item) => item.food._id).includes(food._id)
      );
    }
  }, [cartData, isCartSuccess, isFoodSuccess]);

  const [qty, setQty] = useState<number>(1);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [rating, setRating] = useState<number>(1);
  const [value, setValue] = useState<number>(0);

  const smlSlider = useRef<any>(null);
  const bigSlider = useRef<any>(null);

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

  const goto = (index: number) => {
    setSlideIndex(index);
    smlSlider.current.swiper.slideTo(index);
    bigSlider.current.swiper.slideTo(index);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addFoodToCart = async () => {
    if (cartData && cartData.items.length >= 10) {
      toast({
        msg: "You can have only 10 items in the cart",
      });
    } else {
      await mutateAsync({
        foodId: food!._id,
        quantity: qty,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        msg: `${food?.name || "New food"} has been added to your cart`,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (foodError) {
      router.push(ROUTE_PATHS.home);
    }
  }, [foodError]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <section className="py-5 mt-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] items-center gap-[6rem]">
            <div className="flex flex-col gap-8">
              <div className="productBigSlider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  pagination={{ clickable: true }}
                  className="bigSlider"
                  ref={bigSlider}
                  onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                >
                  {[food?.mainImage]
                    .concat(food?.subImages)
                    .map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image!.url}
                          alt={`img-${index}`}
                          className="w-full aspect-square rounded-lg object-cover"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              <div className="productSmlSlider">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={15}
                  pagination={{ clickable: true }}
                  className="smlSlider"
                  ref={smlSlider}
                >
                  {[food?.mainImage]
                    .concat(food?.subImages)
                    .map((image, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`overflow-hidden rounded-md ${
                            slideIndex === index ? "border-2 border-accent" : ""
                          } cursor-pointer`}
                          onClick={() => goto(index)}
                        >
                          <img
                            src={image!.url}
                            alt={`img-${index}`}
                            className="w-full aspect-square object-cover "
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>

            {/* Food details */}
            {food && (
              <div className="flex flex-col gap-6">
                <h1 className="text-5xl font-bold text-secondary">
                  {getCapitalizedForm({ sentence: food?.name })}
                </h1>

                <p className="text-sm tracking-wide leading-5">
                  {food?.description}
                </p>

                {food.discount > 0 ? (
                  <div>
                    <div className="flex gap-4 items-center mb-1">
                      <span className="text-secondary text-2xl font-bold">
                        {getAmountWithNepaliCurrency({
                          amount:
                            food?.price - food.price * (food.discount / 100),
                        })}
                      </span>
                      <span className="bg-secondary rounded-[4px] text-white text-sm font-medium px-3 py-1">
                        {food.discount}%
                      </span>
                    </div>
                    <span className="text-text-light text-sm line-through font-bold">
                      {getAmountWithNepaliCurrency({ amount: food?.price })}
                    </span>
                  </div>
                ) : (
                  <span className="text-secondary text-2xl font-bold">
                    {getAmountWithNepaliCurrency({ amount: food?.price })}
                  </span>
                )}

                <div className="flex gap-6">
                  <div className="bg-gray-200 flex justify-between items-center gap-4 rounded-md p-4">
                    <Button
                      onClickHandler={minus}
                      isDisabled={alreadyAddedToCart || isOutOfStock}
                    >
                      <Minus className="text-secondary" />
                    </Button>

                    <input
                      type="number"
                      value={qty}
                      readOnly
                      className="w-[56px] border border-black border-opacity-10 rounded-md outline-none text-text-light text-center font-medium px-2 py-1"
                    />

                    <Button
                      onClickHandler={plus}
                      isDisabled={alreadyAddedToCart || isOutOfStock}
                    >
                      <Plus className="text-secondary" />
                    </Button>
                  </div>

                  <Button
                    buttonType={BUTTON_TYPES.redButton}
                    className="flex items-center gap-4"
                    onClickHandler={addFoodToCart}
                    isDisabled={alreadyAddedToCart || isOutOfStock}
                  >
                    {!alreadyAddedToCart && !isOutOfStock && <ShoppingCart />}
                    <span className="font-medium tracking-wide text-xl">
                      {isOutOfStock
                        ? "Out of stock"
                        : alreadyAddedToCart
                        ? "Added to cart"
                        : "Add to cart"}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="">
            <section className="menu">
              <div>
                <h3 className="font-semibold tracking-wide text-3xl text-secondary mb-4">
                  Similar Foods
                </h3>

                {!isSimilarFoodsSuccess ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    autoplay={{
                      delay: 3000, // 3-second autoplay interval
                      disableOnInteraction: false, // Keep autoplay on interaction
                    }}
                    modules={[Navigation, Pagination, Autoplay]}
                    className="foodListing mt-4"
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                      1280: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {similarFoodsData?.foods.map((food) => (
                      <SwiperSlide
                        key={food._id}
                        className="flex items-center justify-center"
                      >
                        <FoodCard
                          food={food}
                          rating={averageRatingData![food._id].AverageRating}
                          score={
                            similarFoodsData.similarityScore[food._id][
                              "Similarity Score"
                            ]
                          }
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodDetails;
