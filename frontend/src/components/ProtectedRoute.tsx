import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

interface Props {
    children: React.ReactNode;
  }
  
  interface JwtPayload {
    exp: number;
  }

function ProtectedRoute({ children } : Props) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);
  

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode<JwtPayload>(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;