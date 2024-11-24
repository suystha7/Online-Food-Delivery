import Image from 'next/image'
import React from 'react'
import Rating from "@mui/material/Rating";

const Menu = () => {
  return (
    <div className='productItem2 border'>
        <div className="imgWrapper relative w-full rounded-t-md overflow-hidden">
            {/* Using Next.js Image component with layout='responsive' */}
            <Image 
              src="/banner/food.webp" 
              alt="img" 
              width={500} // Define the width ratio
              height={300} // Define the height ratio
              layout="responsive" // Ensures responsive scaling
            />
        </div>

        <div className="flex items-center justify-between p-4">
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            size="medium"
            readOnly
          />
        </div>

        <h4 className='text-lg '>BURGER</h4>
    </div>
  )
}

export default Menu
