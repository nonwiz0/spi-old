import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import PageHeader from "@/components/pageHeader";
import SideNav from "@/components/sideNav";
import RegTable from "@/components/regTable";

const Dashboard = () => {
  /*   const { data: session} = useSession();
  console.log({session}) */
  return (
    <main>
      <div>
        {/*    You login?{" "}
        {!session ? (
          <a href="/api/auth/signin">Sign in</a>
        ) : (
          <button onClick={signOut}>Sign out </button>
        )} */}
      </div>
      <section className="flex gap-8 w-full">
        <div className="mr-16 sm:mr-48">
          <SideNav />
        </div>

        <div className="w-full mr-8">
          <PageHeader page_name="Home / Order Request" />

          <RegTable />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
