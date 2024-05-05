import { useCurrentUser, UserInterface } from "@/hooks/user";



interface UserProps{
  userInfo: UserInterface
}


export default function Home(props: UserProps) {

  const {user = props.userInfo as UserInterface} = useCurrentUser()

  return (
    <main>
     <div>
       {user?.firstName} {user?.lastName}     
       
     </div>
     
    </main>
  );
}
