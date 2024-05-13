import { useCurrentUser } from "@/hooks/user";
import EcomLayout from "@/layout/EcomLayout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";


const ProfilePage: NextPage = ()=>{

const {user, isLoading} = useCurrentUser()
const router = useRouter()

useEffect(()=>{
    if(!user && !isLoading){
       router.push("/signin")
    }
},[isLoading, router, user])
    return(
       <div>
          <EcomLayout>
          <div className="border border-b-slate-950 h-72 w-vw  ">
            <h1 className="text-3xl ml-36 mt-24 ">{user?.firstName} {user?.lastName}</h1>
            <h1 className="ml-36">{user?.email}</h1>
        </div>
          </EcomLayout>
       
       </div>
    )
}


export default ProfilePage;