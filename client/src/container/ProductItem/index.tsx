import Image from "next/image";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ProductItem: React.FC = () => {
  return (
    <div className="productItem">
      <div className="imgWrapper relative p-4">
        <Checkbox
          {...label}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
          className="wishlist absolute top-[5px] right-[5px] z-[99]"
        />
        <Image src="/img1.png" alt="img" width={100} height={100} />

        <div className="flex items-center justify-between mt-3">
          <span className="price flex items-center justify-normal p-2 text-y text-lg font-bold bg-brown rounded px-3 py-1">
            Rs. 380
          </span>

          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            size="medium"
            readOnly
          />
        </div>
      </div>
      <div className="info p-4 text-center">
        <h4 className="font-semibold">BIGIT BURGER</h4>
        <p className="text-black/60 mt-2 mb-3">
          Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula
        </p>
        <Button>ADD TO CART</Button>
      </div>
    </div>
  );
};

export default ProductItem;
