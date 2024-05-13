import { Fragment, useCallback } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/user';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import FeedCard from '@/layout/card';
import { ProductsInterface, useGetProducts } from '@/hooks/items';


interface HomeProps{
  products? : ProductsInterface[]
}


const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { products = props.products as ProductsInterface[] } = useGetProducts();
  const queryClient = useQueryClient()

  const handleSignout = useCallback(async()=>{
     
      
      try {
        window.localStorage.removeItem("ecom_token");
       await queryClient.invalidateQueries({queryKey: ["current-user"]})
      } catch (error) {
        console.error(error);
      }
  },[queryClient])

  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    
    { name: 'Sign out', onClick:handleSignout },
  ]
  
 

  


  
    return(
      <div>
       <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between ">
                  <div className="flex items-center  w-96">
                    
                    <div className="hidden md:block w-full ">
                    <div className="ml-10 flex items-baseline space-x-8 w-full">
                    <form className="space-y-6 w-80" method="POST">
    <div className="flex items-center"> 
        <div className="mt-2 flex items-center mb-1 w-full"> 
            <input
                id="search"
                name="search"
                type="search"
                autoComplete='search'
                className="block w-full rounded-md border-0 py-2 pl-3 pr-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button className="px-2 bg-blue-500 text-white rounded-md text-sm shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 h-7">Search</button>
        </div>
    </div>
</form>
</div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                     

                      {/* Profile dropdown */}
                      
                     <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <p >{user?.firstName}</p>
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    onClick={item.onClick}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                     { !user &&<Link className="relative flex max-w-xs items-center rounded-full text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'" href='/signin'>Sign In</Link>}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                   {/* small menu  */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <p>{user?.firstName} </p>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user?.firstName}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

       
        
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8   ">
  <div className=' flex flex-wrap gap-3  w-full h-full '> 
  {products?.map((product: ProductsInterface) => product && <FeedCard key={product.id} data={product} />)}
   
  </div>
  
 
</div>
          
      </div> 
      
      </div>
  )
}
    