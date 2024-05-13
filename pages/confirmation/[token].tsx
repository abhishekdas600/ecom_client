'use client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import {Spinner} from "@nextui-org/spinner";

interface ConfirmEmailProps {
  token: string;
}

  const ConfirmEmail: NextPage<ConfirmEmailProps> = ( {token} ) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {  
      window.localStorage.setItem("ecom_token", token);
      setTimeout(() => {
        router.push('/'); 
      }, 2000); 
    }
  }, [token, router]);

  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner size="lg" color='primary'/>
      <p className='pl-2'>Loading...</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.query ;
  return {
    props: {
      token: token as string
    }
  };
};

export default ConfirmEmail;