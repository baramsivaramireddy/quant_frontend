import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";
const Providers = ({ children }) => {
  return <div> <Toaster />  <AuthProvider >{children}</AuthProvider> </div>;
};

export default Providers;
