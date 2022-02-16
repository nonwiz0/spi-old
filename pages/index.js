import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log({ session });
  return (
    <>
      <div className="p-4">
        <h1> Create User </h1>
      </div>
    </>
  );
}
