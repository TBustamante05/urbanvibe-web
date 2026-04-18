'use client';
import NavBar from "@/components/NavBar";
import ProductItem from "@/components/ProductItem"
import { productsMock } from "@/data/mocks";
import api from "@/lib/axios";
import { ProductSummary } from "@/types/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleProductClick = (id: number) => {
    router.push(`/products/${id}`);
  }

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
        console.log(error)
        setProducts(productsMock)
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  // if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

   // Mock data until API is ready
  
  return (
    <div className="py-8 px-12">
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <div className="mt-15">
        <h1 className="text-center">Products</h1>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {products.map(product => (
            <ProductItem key={product.id} image={product.imageUrls?.[0]} name={product.name} price={product.price} onClick={() => handleProductClick(product.id)}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage