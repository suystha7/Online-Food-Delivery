import { MenuItem } from '@/lib/types';
import { FC } from 'react';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div className="bg-slate-100 rounded-lg p-4 flex items-center space-x-6">
      {/* Image on the left */}
      <img
        src={item.image}
        alt={item.name}
        className="w-32 h-32 object-cover rounded-lg"
      />

      {/* Content on the right */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
        <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        {/* <p className="text-lg font-bold text-gray-800 mt-2">${item.price.toFixed(1)}</p> */}
      </div>
    </div>
  );
};

export default MenuItemCard;
