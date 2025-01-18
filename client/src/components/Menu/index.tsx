// import Image from 'next/image'
// import React from 'react'
// import Rating from "@mui/material/Rating";

// const Menu = () => {
//   return (
//     <div className='foodItem2 border'>
//         <div className="imgWrapper relative w-full rounded-t-md overflow-hidden">
//             {/* Using Next.js Image component with layout='responsive' */}
//             <Image
//               src="/banner/food.webp"
//               alt="img"
//               width={500} // Define the width ratio
//               height={300} // Define the height ratio
//               layout="responsive" // Ensures responsive scaling
//             />
//         </div>

//         <div className="flex items-center justify-between p-4">
//           <Rating
//             name="half-rating"
//             defaultValue={2.5}
//             precision={0.5}
//             size="medium"
//             readOnly
//           />
//         </div>

//         <h4 className='text-lg '>BURGER</h4>
//     </div>
//   )
// }

// export default Menu



"use client";

import React from "react";
import useGetAllFoods from "@/api/food/useGetAllFoods";
import FoodCard from "../../components/FoodCard";
import useGetFoodsByCategory from "@/api/food/useGetFoodsByCategory";
import { Food, Foods } from "@/api/food/FoodTypes";

interface IMenuProps {
  selectedCategory: string;
}

export default function Menu({ selectedCategory }: IMenuProps) {
  let data: Foods | undefined;

  if (selectedCategory === "") {
    const { data: foodData } = useGetAllFoods({ page: 1, limit: 0 });
    data = foodData;
  } else {
    const { data: selectedCategoryFoodData } = useGetFoodsByCategory({
      page: 1,
      limit: 0,
      categoryId: selectedCategory,
    });
    data = selectedCategoryFoodData;
  }

  return (
    <section className="p-6" id="menu">
      <div className="flex gap-6">
        {data?.foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
}
