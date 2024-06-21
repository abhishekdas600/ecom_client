import axiosInstance from "@/clients/api";
import { useCurrentUser } from "@/hooks/user";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";




const SigninPage: NextPage=()=>{
   
  

   const [email, setEmail]= useState('');
   const [password, setPassword]= useState('');
   const [sendData, setSendData]= useState(false)
   const [showPassword, setShowPassword] = useState(false);
   const [wrongInput, setWrongInput] = useState(false)
   const router  = useRouter()
   const {user}= useCurrentUser()
   
   const handleSignin = useCallback(async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
       if(user){
        console.error("User already Signed in")
        return;
       }
       try {
        const data = await axiosInstance.post("/api/auth/login",{
          email: email,
          password: password,
        })
        setSendData(true)
        const token = data.data
        window.localStorage.setItem("ecom_token", token)
        

       } catch (error) {
        console.error(error)
        setWrongInput(true)
       }
   },[email, password, user])
      
   const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

    useEffect(()=>{
      if(sendData){
        console.log("the data has been send")
        router.push("/")
      }
    },[router, sendData])

   
  

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6"  method="POST" onSubmit={handleSignin}>
          {wrongInput && (
            <p className="text-red-500 text-xs mt-1">
              Incorrect email or password. Please try again.
            </p>
          )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="/forgotPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div>
              <div className="mt-2 flex">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
                 <button type="button" className="ml-2 px-3 py-1.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
              </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Donot have an Account?{' '}
            <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    )
}

export default SigninPage;
