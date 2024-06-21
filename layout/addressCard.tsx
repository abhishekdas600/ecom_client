import axiosInstance from "@/clients/api";
import { AddressLayout, useCurrentUser } from "@/hooks/user";
import { Button } from "@nextui-org/react"; // Ensure the correct import
import Link from "next/link";
import { useCallback, useState } from "react";

interface AddressProps {
  data: AddressLayout;
}

const AddressCard: React.FC<AddressProps> = (props) => {
  const { user } = useCurrentUser();
  const { data } = props;
  

  const handleCheckout = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!user) {
        return;
      }
      try {
        const response = await axiosInstance.post("/api/stripe/payment-session",{
            addressId: data.id
        });
            if (response.data.url) {
                window.location.href = response.data.url;
            } else {
                console.error("No URL returned from the payment session");
            }
      } catch (error) {
        console.log(error);
      }
    },
    [data.id, user]
  );

  return (
    <form action="post" onSubmit={handleCheckout}>
      <div className="border border-black h-64 w-80">
        <h3>Address:</h3>
        <p>{data.addressLine}</p>
        <h3>Ph No.:</h3>
        <p>{data.number}</p>
        <h3>City:</h3>
        <p>{data.district}</p>
        <h3>State:</h3>
        <p>{data.state}</p>
        <Button type="submit" className="ml-2 my-1">Select</Button>
      </div>
    </form>
  );
};

export default AddressCard;