import { FC } from "react";
import { dishes } from "@/lib/data";
import DishCard from "@/components/DishCard";

const MenuPage: FC = () => {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
