import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>SPI</title>
     </Head>
     {/*  <div className="relative font-mono h-screen bg-sky-50 text-sky-800 ">
        <Header /> */}
        <Component {...pageProps} />
     {/*    <Footer />
      </div> */}
    </SessionProvider>
  );
}

export default MyApp;
