"use client";
import { Heart, Image } from "lucide-react";
import { useState } from "react";

type Props = {
  image?: string;
  name: string;
  price: number;
};
function ProductItem({ image, name, price }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex flex-col pb-4 cursor-pointer">
      <div className="relative w-full h-[600px] mb-4" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gray-200">
            <Image className="w-32 h-32 text-gray-400 mx-auto my-[200px]" />
          </div>
        )}
        <button className="absolute w-full text-center text-sm bottom-4 left-1/2 -translate-x-1/2 bg-black text-white py-2 hover:bg-[var(--moonstone)] hover:text-black transition-opacity opacity-0 group-hover:opacity-100" style={{ opacity: isHovered ? 1 : 0 }}>
          Add to Cart
        </button>
      </div>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-[15px]">{name}</h3>
        <Heart className="w-4 cursor-pointer hover:fill-black" />
      </div>
      <p className="text-sm">${price.toFixed(2)} USD</p>
    </div>
  );
}

export default ProductItem;
