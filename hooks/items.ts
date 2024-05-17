import axiosInstance from "@/clients/api"
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


