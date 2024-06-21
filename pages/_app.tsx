import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {NextUIProvider} from "@nextui-org/react";
const quickSand = Quicksand({subsets: ['latin']})
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ChakraProvider } from '@chakra-ui/react'


const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    
     <QueryClientProvider client={queryClient}>
      <ChakraProvider>
    <NextUIProvider>
    <UserProvider>
       <div className={quickSand.className}> 
      <Component {...pageProps} />      
    </div>
    </UserProvider>
    </NextUIProvider>
    </ChakraProvider>
    </QueryClientProvider>
    
  );
}
