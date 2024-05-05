
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
            const response = await axiosInstance.get("/api/user/currentuser");
            return response.data;
        }
    });

    return {
        ...query,
        user: query.isSuccess ? query.data : null, 
    };
};