import axiosInstance from "@/clients/api";
import { useCurrentUser } from "@/hooks/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";


export default function ForgotPasswordPage(){
    const{user}= useCurrentUser()
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [resetEmailSent, setResetEmailSent] = useState(false);
    
    const handleChangePassword = useCallback(async()=>{
        if(user){
            console.log("User already Found")
            return;
        }  
        if(!email) 
            {return;}
          
          try {
            setSendingEmail(true);
            await axiosInstance.post("/api/auth/forgotpassword",{
                email:email
            })
            setResetEmailSent(true)
          } catch (error) {
            console.error(error);
          }
           finally{
            setSendingEmail(false)
          }
    },[email, user])

    useEffect(()=>{
        if(resetEmailSent){
            setEmail('');
            router.push('/signin')
        }
    },[resetEmailSent, router])

    return(
        <div>
           <div className="flex min-h-full flex-1 flex-col justify-center px-12  py-12 lg:px-8  mx-11">
      <div className="sm:mx-auto sm:w-auto sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Confirm Your Email
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full  sm:max-w-sm">
      <form className="space-y-6" method="POST" >
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </form>
      
      <div>
        <button
         
          disabled={!email || sendingEmail}
          onClick={handleChangePassword} 
          type="button" 
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {sendingEmail ? 'Sending...' : 'Send Email'}
        </button>
        
        <p className="mt-10 text-center text-sm text-gray-500">
          New User?{' '}
          <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
        </div>
      </div>
    </div>
        </div>
    )
}