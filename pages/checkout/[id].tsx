import { useCurrentUser } from "@/hooks/user";
import { GetServerSideProps, NextPage } from "next";


interface CheckoutPageProps {
    id: string
}

const CheckoutPage : NextPage<CheckoutPageProps> = ({id}) =>{
    
    const addressId = id;
    const {user} = useCurrentUser();



    return (
        <div>
             
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query ;
    return {
      props: {
        id: id as string
      }
    };
  };


export default CheckoutPage;