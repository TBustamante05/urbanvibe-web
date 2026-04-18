import { Heart, Minus, Plus, Trash } from "lucide-react";
import { ProductCart as ProductCartType } from "../types/products";

function ProductCart({ product }: { product: ProductCartType }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl || "/fit1.jpeg"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <div>
            <div>
              <p>Art. No</p>
              <p>{product.id}</p>
            </div>
            <div>
              <p>Quantity</p>
              <p>{product.quantity}</p>
            </div>
            <div>
              <p>Price</p>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div>
              <p>Total</p>
              <p>${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 border border-zinc-200 pt-2">
            <button className="border border-t-none border-s-none border-e-zinc-200 px-2">
              <Heart />
            </button>
            <div className="flex gap-2">
              {product.quantity > 1 ? (
                <button>
                  <Minus />
                </button>
              ) : (
                <button>
                  <Trash />
                </button>
              )}
              <p>{product.quantity}</p>
              <button>
                <Plus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
