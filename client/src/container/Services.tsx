
import { services } from '@/lib/data';
import { FC } from 'react';

const Services: FC = () => {
  return (
    <div className="space-y-12 my-10">
      <div className="w-[95%] mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center gap-2 text-center bg-white p-6 rounded-lg shadow-md inset-5">
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
