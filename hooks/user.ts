
import axiosInstance from "@/clients/api";
import { useQuery } from "@tanstack/react-query";


export interface UserInterface{
    firstName: string,
    lastName: string,
    email: string,
    profileImageUrl: string,
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