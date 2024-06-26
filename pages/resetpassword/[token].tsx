import axiosInstance from "@/clients/api";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


interface ResetPasswordProps{
   token: string;
}

const ResetPassword: NextPage<ResetPasswordProps>= ( {token} )=>{
  const emailToken = token;
  const router = useRouter()
  const[password, setPassword]= useState('');
  const[confirmPassword, setConfirmPassword]= useState('');
  const[sendConfirmation, setSendConfirmation]= useState(false)
 const handleSubmitPassword = useCallback(async(e: React.FormEvent<HTMLFormElement>)=>{

      e.preventDefault();
      if(!emailToken)return;
     try {
      if(password===confirmPassword){
        await axiosInstance.post(`/api/auth/resetpassword/${emailToken}`,{
          password:password
        })
        setSendConfirmation(true);
      }
     else{
      console.error("Passwords donot match")
     }
     } catch (error) {
      console.error(error);
     }
 },[confirmPassword, emailToken, password])

   useEffect(()=>{
    if(sendConfirmation){
      setPassword('')
      setConfirmPassword('')
      router.push("/signin")
    }
   },[router, sendConfirmation])
 
 return(
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  method="POST" onSubmit={handleSubmitPassword}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                 Confirm Password
                </label>
                
              </div>
              <div className="mt-2">
              {password != confirmPassword && 
                 <p className="font-semibold text-indigo-600 hover:text-indigo-500">Passwords donot match</p>
                }
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change Password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {' '}
            <Link href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-8">
              SignIn
            </Link>
          </p>
        </div>
      </div>
 )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { token } = context.query ;
    return {
      props: {
        token: token as string
      }
    };
  };


  export default ResetPassword;