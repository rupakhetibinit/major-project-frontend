import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider, QueryClient } from "react-query";
import "../styles/globals.css";
const queryClient = new QueryClient();
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
