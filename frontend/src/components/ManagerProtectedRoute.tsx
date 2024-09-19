import { Navigate } from "react-router-dom";
import { USER_ROLE } from "../constants";
import { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

function ManagerProtectedRoute({ children }: Props) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const auth = async () => {
    const role = localStorage.getItem(USER_ROLE);
    if (role === "manager") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/forbidden" />;
}

export default ManagerProtectedRoute;
