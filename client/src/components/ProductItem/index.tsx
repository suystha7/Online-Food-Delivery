import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProductItem: React.FC = () => {
  const { productId } = useParams();

  return (
    <div className="productItem">
      <div className="imgWrapper">
        <Link href={`/product/${productId}`} passHref>
          <Image src="/img1.png" alt="img" width={100} height={100} />
        </Link>

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
        <Link href={`/product/${productId}`} passHref>
          <h4 className="productTitle">BIGIT BURGER</h4>
        </Link>
        <p className="productDescription">
          Mushroom patty, vegan cheese, lettuce, tomatoes, avocado ligula
        </p>
        <Link href={`/product/${productId}`} passHref>
          <Button className="addToCartButton">ADD TO CART</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
