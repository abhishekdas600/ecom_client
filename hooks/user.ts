
import axiosInstance from "@/clients/api";
import { useQuery } from "@tanstack/react-query";


export interface ProductsInterface{
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    itemQuantity: string
 }
 
 export interface CartLayoutInteface{
    id: string,
    title : string,
    price: number,
    quantity: number,
    image: string
 }
export interface UserInterface{
    firstName: string,
    lastName: string,
    email: string,
    profileImageUrl: string,
}

export interface AddressLayout{
    id: string,
    userId: string,
    addressLine: string,
    number: string,
    district: string,
    state: string,
    pincode: number
}


export const useCurrentUser = () => {
    const query = useQuery<UserInterface>({
        queryKey: ['current-user'],
        queryFn: async () => {
            const response =  await  axiosInstance.get("/api/user/currentuser");
           return response.data;
            
        },
        staleTime: 1000,
        retry:false,
        
       
    });

    return {
        ...query,
        user: query.isSuccess? query.data: null
    };
};
export const useGetCart = () =>{
    const query = useQuery<CartLayoutInteface[]>({
        queryKey:['cart'],
        queryFn: async()=>{
            const response = await axiosInstance.get<CartLayoutInteface[]>('api/user/cart')
            return response.data;
        },
        retry: false
    })
    return {
        ...query,
        cart: query.isSuccess? query.data:null,
    }
}

export const useGetAddresses = ()=>{
    const query = useQuery<AddressLayout[]>({
        queryKey: ['address'],
        queryFn: async()=>{
            const response = await axiosInstance.get('/api/user/addresses')
            return response.data

        },
        retry:false
    })
    return {
        ...query,
        addresses: query.isSuccess? query.data:null,
    }
}