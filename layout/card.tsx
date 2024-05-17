import {  useGetProducts } from "@/hooks/items";
import { ProductsInterface } from "@/hooks/user";
import Image from "next/image";
import Link from "next/link";


interface FeedCardProps{
    data: ProductsInterface,
}

const FeedCard: React.FC <FeedCardProps>=(props)=>{

 const {data} = props

    return(
    
        <Link href={`/productPage/${data.id}`}>
       <div className='border h-full w-96 rounded-lg hover:bg-slate-100 cursor-pointer'>
       { data &&  <><div className=' w-72 h-72 flex justify-center bg-slate-200 rounded-lg'>
                <Image className='w-56 h-48 items-center ' src={data?.image} alt={'Image'} height={150} width={250} />
            </div><div className='flex justify-between  mx-5'>
                    <h1>{data.title}</h1>
                    <h1> {data.price}</h1>
                </div></>}
      </div>
      </Link>
    
    
    
    )
}


export default FeedCard;