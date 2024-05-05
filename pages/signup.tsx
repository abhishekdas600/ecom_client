import axiosInstance from "@/clients/api";
import { useCurrentUser } from "@/hooks/user";


import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect,  useState } from "react";




export default function SignupPage(){

  const [firstName, setFirstName]= useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('')
  const [sendEmail, setSendEmail]= useState(false)
  

  const router = useRouter();
  const {user}= useCurrentUser();

  const handleSignin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    if (user) {
      console.error("User already found");
      return; 
    }

    try {
      if(password===confirmPassword){
        await axiosInstance.post("/api/auth/signup", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        });
      }
      else{
        console.error("Passwords donot match");
      }
      

      console.log("Signup successful. Redirecting to '/loading'...");
      setSendEmail(true);
    } catch (error) {
      console.error(error);
    }
  }, [confirmPassword, email, firstName, lastName, password, user]);

  useEffect(() => {
    if (sendEmail) {
      console.log("sendEmail is true. Redirecting to '/loading'...");
      router.push('/signin');
    }
  }, [router, sendEmail]);
  


  return(
    <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="post" onSubmit={handleSignin} >
          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e)=> setFirstName(e.target.value)}
                  autoComplete="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div><div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
               Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="text"
                  value={lastName}
                  onChange={(e)=> setLastName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
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
                  onChange={(e)=> setEmail(e.target.value)}
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
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Re-Enter Password
                </label>
               
              </div>
              <div className="mt-2">
              {password != confirmPassword && 
                 <p className="font-semibold text-indigo-600 hover:text-indigo-500">Passwords donot match</p>
                }
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e)=> setConfirmPassword(e.target.value)}
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
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}