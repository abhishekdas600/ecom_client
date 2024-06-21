import axiosInstance from "@/clients/api"
import { PrevOrderedLayout } from "@/pages/profile"
import { useQuery } from "@tanstack/react-query"






export const useGetProducts = ()=>{
    const query = useQuery({
        queryKey:['products'],
        queryFn: async()=>{
            const response = await axiosInstance.get('api/item/products')
            return response.data;
        },
        retry: false
    })

    return {
        ...query,
        products: query.isSuccess? query.data:null,
    }
}


export const useGetPrevOrders  = ()=>{
    const query = useQuery<PrevOrderedLayout[]>({
        queryKey:[`prev_products`],
        queryFn: async()=>{
            const response = await axiosInstance.get('/api/item/prev-orders')
            return response.data
        },
         retry: false
    })
    return{
        ...query,
        prevOrders: query.isSuccess? query.data:null
    }
}