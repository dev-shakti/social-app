import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);
 
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
