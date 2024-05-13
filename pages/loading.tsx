import { useCurrentUser } from "@/hooks/user";
import { Spinner } from "@nextui-org/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";


const LoadingPage:NextPage =()=>{
    
  const router = useRouter()
 
  useEffect(()=>{
    
    setTimeout(() => {
        router.push('/'); 
      }, 2000); 
  })

    return(
        <div>
            <div className='flex justify-center items-center h-screen'>
      <Spinner size="lg" color='primary'/>
      <p className='pl-2'>Loading...</p>
    </div>
        </div>
    )
}
export default LoadingPage;