"use client"
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const Providers = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <div>
      {" "}
      <Toaster />{" "}
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>{" "}
    </div>
  );
};

export default Providers;
