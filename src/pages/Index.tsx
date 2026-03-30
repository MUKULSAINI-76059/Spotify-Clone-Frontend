import { useAuth } from "@/contexts/AuthContext";
import Home from "./Home";
import Login from "./Login";

export default function Index() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Home /> : <Login />;
}
