import NavBar from "@/components/NavBar";
import ProductImageSlider from "@/components/ProductImageSlider";
import { Heart } from "lucide-react";

function ProductDetail() {
  return (
    <div className="max-w-[1120px] mx-auto">
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <div className="mt-25 grid grid-cols-1 md:grid-cols-2 px-12 lg:px-0 pb-12 md:py-0 items-center gap-6 lg:gap-12">
        <div className="w-full h-[calc(100vh-200px)]">
          <ProductImageSlider />
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xl">Product Name</h3>
            <Heart className="w-4 cursor-pointer hover:fill-black" />
          </div>
          <p className="text-gray-700 mb-6">$29.99 USD</p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Filters */}
          <span className="border border-gray-300 py-2 px-4 hover:border-black cursor-pointer">T-shirt</span>
          <hr className="text-gray-200 my-7"/>
          <div className="flex justify-between items-center mb-4">
            <p className="underline text-sm">Ver medidas</p>
            <p className="underline text-sm">Encontrar mi talla</p>
          </div>
          {/* Sizes */}
          <select name="size" id="size" className="border text-sm text-gray-600 py-2 px-4 mb-4 outline-none w-full">
            <option disabled value="">Select a size</option>
            <option value="xs">XS</option>
            <option value="s">S</option>
            <option value="m">M</option>
            <option value="l">L</option>
            <option value="xl">XL</option>
          </select>
          <button className="w-full bg-black text-white py-2 px-4 hover:bg-[var(--moonstone)] hover:text-black transition-colors text-sm cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
