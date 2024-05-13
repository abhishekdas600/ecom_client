import axiosInstance from "@/clients/api"
import { useQuery } from "@tanstack/react-query"


export interface ProductsInterface{
   id: string,
   title: string,
   price: number,
   description: string,
   category: string,
   image: string
}



export const useGetProducts = ()=>{
    const query = useQuery({
        queryKey:['products'],
        queryFn: async()=>{
            const response = await axiosInstance.get('api/item/products')
            return response.data;
        }
    })

    return {
        ...query,
        products: query.isSuccess? query.data:null,
    }
}

