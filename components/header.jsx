import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const { data: session} = useSession();
  console.log(session);
  return (
    <>
      <div className="p-2 bg-sky-900 text-white flex flex-row justify-between">
        <div>
          <Link href="/"><a> COR - SPI </a></Link>
        </div>
        <div className="flex flex-row gap-8">
          {!session ?
          <a href="./api/auth/signin"> Sign in </a>
          :
          <button onClick={() => signOut()} className=""> Sign out </button>
      }
        </div>
      </div>
    </>
  );
};

export default Header;
