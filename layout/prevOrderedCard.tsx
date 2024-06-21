import { PrevOrderedLayout } from "@/pages/profile";
import Image from "next/image";
import Link from "next/link";

interface PrevOrderedCardLayout{
    data: PrevOrderedLayout
}

const PrevOrderedCard: React.FC <PrevOrderedCardLayout>= (props)=>{
   const {data} = props;

   return(
    <Link href={`/productPage/${data.item.id}`}>
    <div className=" h-32 w-32 flex items-center justify-center">
    <Image className="h-24 w-24" src= {data.item.image}  alt = {`Image`} height={90} width={90}/>
 </div>
 </Link>
   )
}

export default PrevOrderedCard;