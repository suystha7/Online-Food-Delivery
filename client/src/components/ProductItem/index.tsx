import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

const ProductItem: React.FC = () => {
  return (
    <div className="productItem">
      <div className="imgWrapper">
        <Image src="/img1.png" alt="img" width={100} height={100} />

        <div className="ratingWrapper">
          <span className="price">Rs. 380</span>

          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            size="medium"
            readOnly
          />
        </div>
      </div>

      <div className="info cursor-pointer bg-white">
        <h4 className="productTitle">BIGIT BURGER</h4>
        <p className="productDescription">
          Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula
        </p>
        <Button className="addToCartButton">ADD TO CART</Button>
      </div>
    </div>
  );
};

export default ProductItem;
