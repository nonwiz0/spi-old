import { useSession, signIn, signOut } from "next-auth/react"

export default function SignUp() {
    const { data: session} = useSession();
    console.log({session}, "at signup")
    return (
        <>
            <div className="bg-teal-500"> 
                
                <h1> Hewllooo there </h1> 
                <button className="bg-blue-500 p-2" onClick={() => signIn()}> Sign in </button>
                <br />
                <button className="bg-rose-500 p-2" onClick={() => signOut()}> Sign out </button>
                <a href="/">Index </a>


            </div></>
    )
}