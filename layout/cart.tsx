import { Fragment, useCallback, useMemo, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useGetCart } from '@/hooks/user'
import { CartLayoutInteface, ProductsInterface } from '@/hooks/user';
import Image from 'next/image';
import axiosInstance from '@/clients/api';
import {  useQueryClient } from '@tanstack/react-query';
import { FiShoppingCart } from "react-icons/fi"
import Link from 'next/link';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from '@chakra-ui/react'
import React from 'react';

interface CartInterface{
  data: CartLayoutInteface[]
}

const Cart:React.FC<CartInterface>=(props)=> {
 

  const {cart = props.data as CartLayoutInteface[] } = useGetCart();
  const queryClient = useQueryClient();

  const handleRemoveItem = useCallback(async(id: string)=>{
    try {
      await axiosInstance.delete(`/api/user/removefromcart/${id}`)
      queryClient.invalidateQueries({queryKey:['cart']})
    } catch (error) {
      console.error(error)
    }
  },[queryClient])
  const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement>(null)

 

  const calculateSubtotal = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
  
    return cart.reduce((total:number, product: CartLayoutInteface) => total + ((product.quantity as number )* product.price), 0);
  },[cart]);

  return (
    <div>
     <Button ref={btnRef}  onClick={onOpen}>
          Cart
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
               {cart && cart.length!=0 && <p>Shopping Cart</p>}
               {!cart || cart.length ===0 && 
                <p>Cart is Empty</p>
               }
            </DrawerHeader>
  
            <DrawerBody>
            <div className="mt-8">
                       <div className="flow-root">
                         <ul role="list" className="-my-6 divide-y divide-gray-200">
                           {cart?.map((product : CartLayoutInteface) => (
                             <li key={product.id} className="flex py-6">
                               <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                 <Image
                                  src={product.image}
                                   alt={product.title}
                                  className="h-full w-full object-cover object-center"
                                 height={50} width={50}
                                />
                               </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={`/productPage/${product.id}`}>{product.title}</a>
                                    </h3>
                                    <p className="ml-4">${((product.quantity as number)*(product.price)).toFixed(2)}</p>
                                  </div>
                                </div>
                               <div className="flex flex-1 items-end justify-between text-sm">
                                 <p className="text-gray-500">Qty {product.quantity as number}</p>
                                 <div className="flex">
                                   <button
                                     onClick={()=> handleRemoveItem(product.id)}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                               </div>
                            </li>
                           ))}
                         </ul>
                     </div>
                    </div>
            </DrawerBody>
  
            <DrawerFooter>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    {cart && cart.length !=0 && <div className="flex justify-between text-base font-medium text-gray-900 ">
                      <p>Subtotal:</p>
                      <p>${calculateSubtotal.toFixed(2)}</p>
                    </div>}
                   
                    
                    <div className="mt-6">
                     {cart && cart.length !=0 && <Link
                        href="/address"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                         Select Address
                      </Link>}
                     
                    </div>
                    
                  </div>
                
              
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    </div>
  )
}

export default Cart;
