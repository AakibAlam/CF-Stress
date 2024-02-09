import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import baseUrl from "../../baseurl.jsx";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = cookies.token;
      console.log("stored token: ", storedToken);
      if (storedToken !== "undefined") {
        try {
          const response = await axios.get(baseUrl, {
            withCredentials: true,
          });
          console.log("Response: ", response.data);
          setUser(response.data.user);
        } catch (error) {
          console.error("Error checking token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    checkToken();
  }, [cookies.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
