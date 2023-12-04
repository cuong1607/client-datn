import React, { Fragment } from "react";
import Router from "next/router";
import { wrapper } from "../store";

// types
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
// global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";
import ThemeProvider from "../components/context/theme-provider";

import * as gtag from "./../utils/gtag";

const isProduction = process.env.NODE_ENV === "production";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // disable retry,
      refetchOnWindowFocus: false, // disable refetch on window focus,
      keepPreviousData: true, // keep previous data if query
      staleTime: 10000, // time cache data fetching,
    },
  },
});
// only events on production
if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  </Fragment>
);

export default wrapper.withRedux(MyApp);
