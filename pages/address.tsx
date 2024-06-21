import { NextPage } from "next";
import { useCurrentUser, useGetAddresses } from "@/hooks/user";
import { useCallback, useState, FormEvent, useEffect } from "react";
import axiosInstance from "@/clients/api";
import AddressCard from "@/layout/addressCard";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const AddressPage: NextPage = () => {
  const { user } = useCurrentUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');

  const [addressSent, setAddressSent]= useState(false);

  const {addresses} = useGetAddresses();
  const queryClient = useQueryClient();
 
  const router = useRouter()

  const handleSaveAddress = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axiosInstance.post("/api/user/createaddress", {
        addressLine: address,
        pincode: pincode,
        district: district,
        state: state,
        number: number
      });
      queryClient.invalidateQueries({queryKey: ['address']})
      setAddressSent(true);
      console.log("Address saved successfully")
    } catch (error) {
      console.error(error);
      console.log("address not saved")
    }
  }, [address, district, number, pincode, queryClient, state]);

  useEffect(()=>{
     if(addressSent){
       setAddress('');
       setDistrict('');
       setNumber('');
       setPincode('');
       setState('');
       
     }
  },[addressSent])

  return (
    <div className="px-20 py-10">
      <form method="POST" onSubmit={handleSaveAddress}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Select Address</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="region"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    id="region"
                    autoComplete="address-level1"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      <h3 className="text-base font-semibold leading-7 text-gray-900">Saved Addresses:</h3>
      <div className="mt-5 flex flex-wrap gap-5">
          {addresses?.map(add => add && <AddressCard key={add.id}  data={add}/>)}
      </div>
    </div>
  );
};

export default AddressPage;