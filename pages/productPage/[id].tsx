import axiosInstance from "@/clients/api";
import { ProductsInterface, useCurrentUser, useGetCart, CartLayoutInteface } from "@/hooks/user";
import EcomLayout from "@/layout/EcomLayout";
import { useQueryClient } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useCallback, useState, useEffect, useMemo } from 'react';

interface ProductProps {
  productInfo: ProductsInterface;
}

const ProductPage: NextPage<ProductProps> = ({ productInfo }) => {
  const { user } = useCurrentUser();
  const { cart } = useGetCart();
 
  const [count, setCount] = useState(1);
  const queryClient = useQueryClient()

  const isProductInCart = cart?.some((product: CartLayoutInteface) => product.id === productInfo.id);

  

  const increment = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  const handleAddToCart = useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (!user || !productInfo) return;
    if (isProductInCart) return;

    try {
      await axiosInstance.post('/api/user/addtocart', {
        itemId: productInfo.id,
        quantity: count,
      });
      // Optimistically update the cart state
      setCount(1);
      queryClient.invalidateQueries({queryKey: ["cart"]})
    } catch (error) {
      console.error(error);
    }
  }, [user, productInfo, isProductInCart, count, queryClient]);

 

  return (
    <EcomLayout>
      <div className="bg-white">
        <div className="pt-6">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <Image
                src={productInfo.image}
                alt={productInfo.title}
                height={200}
                width={200}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {productInfo.title}
              </h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${productInfo.price}</p>

              {user && (
                <div className="flex items-center mt-4">
                  <button
                    disabled={isProductInCart}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                    onClick={decrement}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 py-2 px-4">{count}</span>
                  <button
                    disabled={isProductInCart}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
              )}

              {user && (
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isProductInCart ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={isProductInCart}
                >
                  {isProductInCart ? "Already in Cart" : "Add to Bag"}
                </button>
              )}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{productInfo.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EcomLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ProductProps> = async (context) => {
  const { id } = context.query;

  try {
    const response = await axiosInstance.get(`/api/item/productsById/${id}`);
    const productInfo = response.data;

    if (!productInfo) {
      return { notFound: true };
    }

    return {
      props: { productInfo },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { notFound: true };
  }
};

export default ProductPage;
