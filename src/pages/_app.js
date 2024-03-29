import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { route } from "next/dist/server/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as ga from "../lib/analytics";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      <Component {...pageProps} key={route} />
    </ChakraProvider>
  );
}

export default MyApp;
