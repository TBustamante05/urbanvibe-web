'use client';
import NavBar from "@/components/NavBar";
import ProductItem from "@/components/ProductItem"

function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "/fit1.jpeg"
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      image: "/fit2.jpeg"
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
      image: "/fit1.jpeg"
    },
    {
      id: 4,
      name: "Product 4",
      price: 39.99,
      image: "/fit2.jpeg"
    },
    {
      id: 5,
      name: "Product 5",
      price: 24.99,
      image: "/fit1.jpeg"
    },
    {
      id: 6,
      name: "Product 6",
      price: 59.99,
      image: "/fit2.jpeg"
    },
    {
      id: 7,
      name: "Product 7",
      price: 14.99,
      image: "/fit1.jpeg"
    },
    {
      id: 8,
      name: "Product 8",
      price: 44.99,
      image: "/fit2.jpeg"
    }
  ]
  return (
    <div className="py-8 px-12">
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <div className="mt-15">
        <h1 className="text-center">Products</h1>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {products.map(product => (
            <ProductItem key={product.id} image={product.image} name={product.name} price={product.price}/>
              
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage