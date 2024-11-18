// components/Services.tsx

import { Service } from '@/lib/types';
import { FC } from 'react';


const services: Service[] = [
  {
    icon: '🍽️', // You can use Unicode icons or use React Icons for more options
    title: 'Dine-In',
    description: 'Enjoy our cozy indoor dining area with excellent ambiance and service.',
  },
  {
    icon: '🚗',
    title: 'Takeout',
    description: 'Order online and pick up your food to enjoy at home or on the go.',
  },
  {
    icon: '🍕',
    title: 'Delivery',
    description: 'Get your favorite meals delivered to your doorstep with fast and safe delivery.',
  },
  {
    icon: '🍷',
    title: 'Specialty Drinks',
    description: 'We offer a wide range of specialty beverages to complement your meal.',
  },
];

const Services: FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto text-center">
        {/* <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Services</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md inset-5">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
