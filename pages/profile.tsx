import { ProductsInterface, useCurrentUser } from "@/hooks/user";
import EcomLayout from "@/layout/EcomLayout";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import axiosInstance from "@/clients/api";
import PrevOrderedCard from "@/layout/prevOrderedCard";
import {  useGetPrevOrders } from "@/hooks/items";



export interface Item {
   id: string;
   title: string;
   image: string;
   itemQuantity: number;
   price: number;
   category: string;
   description: string;
   createdAt: string;
   updatedAt: string;
 }
export interface PrevOrderedLayout {
 item: Item
}


export interface OrderedPageLayout {
  data: PrevOrderedLayout[];
}


const ProfilePage: NextPage<OrderedPageLayout> = ({ data }) => {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  const {prevOrders =data as PrevOrderedLayout[] } = useGetPrevOrders()

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/signin");
    }
  }, [isLoading, router, user]);

  return (
    <EcomLayout>
      <div className="border border-b-slate-950 h-72 w-vw">
        <h1 className="text-3xl ml-36 mt-24">
          {user?.firstName} {user?.lastName}
        </h1>
        <h1 className="ml-36">{user?.email}</h1>
      </div>
     { prevOrders&& prevOrders.length!==0 &&<div>
        <h1 className="p-4 text-xl">Previous Orders:</h1>
      </div>}
      {prevOrders&&prevOrders.length!==0 &&<div className="flex gap-9 flex-wrap">
        {prevOrders?.map((item) => item && <PrevOrderedCard key={item.item.id} data={item} />)}
      </div>}
    </EcomLayout>
  );
};




export default ProfilePage;