"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Minus, Plus } from "lucide-react";
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
import { useParams } from "next/navigation";
import useAddOrUpdateCartItemQuantity from "@/api/cart/useAddOrUpdateCartItemQuantity";

interface CustomTabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel({
  children,
  value,
  index,
  ...other
}: CustomTabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const products = [
  {
    id: 1,
    image: "/img1.png",
    title: "BIGIT BURGER",
    description: "Mushroom patty, vegan cheese, lettuce, tomatoes",
    price: "Rs. 380",
    rating: 2.5,
  },
  {
    id: 2,
    image: "/img1.png",
    title: "CHEESE BURGER",
    description: "Beef patty, cheddar cheese, lettuce, onions, pickles",
    price: "Rs. 450",
    rating: 4.0,
  },
  {
    id: 3,
    image: "/img1.png",
    title: "VEGAN BURGER",
    description: "Lentil patty, avocado, spinach, tomatoes",
    price: "Rs. 500",
    rating: 4.5,
  },
  {
    id: 4,
    image: "/img1.png",
    title: "CLASSIC BURGER",
    description: "Beef patty, lettuce, tomatoes, ketchup, mustard",
    price: "Rs. 350",
    rating: 3.0,
  },
  {
    id: 3,
    image: "/img1.png",
    title: "VEGAN BURGER",
    description: "Lentil patty, avocado, spinach, tomatoes",
    price: "Rs. 500",
    rating: 4.5,
  },
  {
    id: 4,
    image: "/img1.png",
    title: "CLASSIC BURGER",
    description: "Beef patty, lettuce, tomatoes, ketchup, mustard",
    price: "Rs. 350",
    rating: 3.0,
  },
];

const FoodDetails = () => {
  const params = useParams();

  const { data: food } = useGetFoodById({ foodId: params.foodId as string });

  const { mutateAsync, isSuccess, isError, error } =
    useAddOrUpdateCartItemQuantity();

  const [qty, setQty] = useState<number>(1);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [rating, setRating] = useState<number>(1);
  const [value, setValue] = useState<number>(0);

  const bigImages: string[] = ["/img2.png", "/img3.jpg"];
  const smlImages: string[] = ["/img2.png", "/img3.jpg"];

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
    await mutateAsync({
      foodId: food!._id,
      quantity: qty,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("food has been added to cart");
    }
  }, [isSuccess]);

  return (
    <div>
      <section className="py-5 mt-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="productBigSlider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  pagination={{ clickable: true }}
                  className="bigSlider"
                  ref={bigSlider}
                  onSlideChange={(swiper) => setSlideIndex(swiper.realIndex)}
                >
                  {bigImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt={`img-${index}`}
                        width={450}
                        height={400}
                        objectFit="cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="productSmlSlider mt-4">
                <Swiper
                  slidesPerView={5}
                  spaceBetween={15}
                  pagination={{ clickable: true }}
                  className="smlSlider"
                  ref={smlSlider}
                >
                  {smlImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        className={`item ${slideIndex === index && "active"}`}
                        onClick={() => goto(index)}
                      >
                        <Image
                          src={image}
                          alt={`img-${index}`}
                          width={100}
                          height={100}
                          objectFit="cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Food details */}
            {food && (
              <div className="flex flex-col mt-8 pt-5">
                <h1 className="text-5xl font-bold text-brown">
                  {getCapitalizedForm({ sentence: food?.name })}
                </h1>

                <h3 className="text-yellow-500 font-extrabold text-4xl mt-3">
                  {getAmountWithNepaliCurrency({ amount: food?.price })}
                </h3>

                <p className="my-4 text-base">{food?.description}</p>

                <div className="flex items-center mt-4">
                  <div className="qtyDrop flex items-center gap-4">
                    <Button className="action" onClick={minus}>
                      <Minus />
                    </Button>

                    <input
                      type="number"
                      value={qty}
                      readOnly
                      className="qty-input"
                    />

                    <Button className="action" onClick={plus}>
                      <Plus />
                    </Button>
                  </div>

                  <Button
                    className="btn-red no-radius ml-4"
                    onClick={addFoodToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </div>

          <br />

          <Box sx={{ width: "100%" }} className="tabs">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="More Info" {...a11yProps(0)} className="itemTab" />
                <Tab
                  label="Reviews (0)"
                  {...a11yProps(1)}
                  className="itemTab"
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {/* <h4 className="text-brown text-2xl font-bold mb-3">
                Description
              </h4> */}
              <p className="text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
                placeat eos velit minus vitae natus facilis illum ducimus
                assumenda optio voluptatibus quasi, beatae consequuntur possimus
                eum obcaecati recusandae nostrum.
              </p>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              {/* <h4 className="text-brown text-2xl font-bold mb-3">Reviews</h4> */}
              <p className="text-base">There are no rated yet</p>
              <h4 className="text-2xl text-black/60 font-medium">
                Be the first to rate "Classic Burger"
              </h4>
              <p className="text-sm mb-3 font-semibold">
                Your email address will not be published. Required fields are
                marked *
              </p>
              <p className="text-lg mb-3 font-medium">Your Rating *</p>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue || 0);
                }}
              />
              {/* <p className="text-lg mt-3 font-medium">Your Review *</p> */}

              {/* <form className="w-full">
                <div className="form-group w-full mt-4">
                  <TextField
                    id="outlined-basic"
                    label="Review *"
                    variant="outlined"
                    className="w-full"
                    multiline
                    rows={4}
                  />
                  <div className="form-group w-[25%] mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      className="w-full"
                    />
                  </div>
                  <div className="form-group w-[25%] mt-4">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      className="w-full"
                    />
                  </div>
                </div>

                <br />

                <Button className="btn-red">Submit</Button>
              </form> */}
            </CustomTabPanel>
          </Box>

          <div className="" id="menu">
            <section className="menu">
              <div>
                <h3 className="font-semibold text-3xl text-red-500">
                  Related Products
                </h3>

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
                  {products.map((product) => (
                    <SwiperSlide
                      key={product.id}
                      className="flex items-center justify-center"
                    >
                      <div className="foodItem">
                        <div className="imgWrapper">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={100}
                            height={100}
                          />

                          <div className="ratingWrapper">
                            <span className="price">{product.price}</span>

                            <Rating
                              name="half-rating"
                              defaultValue={product.rating}
                              precision={0.5}
                              size="medium"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="info cursor-pointer bg-white">
                          <h4 className="productTitle">{product.title}</h4>
                          <p className="productDescription">
                            {product.description}
                          </p>
                          <Button className="addToCartButton">
                            ADD TO CART
                          </Button>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodDetails;
