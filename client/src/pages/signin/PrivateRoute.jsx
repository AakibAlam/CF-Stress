import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth();
  console.log("private: ", user);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
