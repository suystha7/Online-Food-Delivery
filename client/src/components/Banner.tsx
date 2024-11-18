// components/Banner.tsx
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="relative w-full h-[300px] md:h-[500px] bg-cover bg-center mt-10">
      {/* Background Image */}
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <Image 
        src="/banner/banner.webp" 
        alt="Banner Background" 
        layout="fill" 
        objectFit="cover"
        className="z-0"
      />
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* <div className="text-center text-white px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Special Offer</h1>
          <p className="text-lg md:text-2xl mb-6">
            Get 50% off your first order! Limited time only.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg text-xl">
            Claim Offer
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Banner;
