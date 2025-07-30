
import { createContext, useState, useEffect } from "react";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext();

const getNameFromEmail = (email) => {
  if (!email) return "User";
  return email.split("@")[0];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedUser = decodeToken(token);
      if (decodedUser) {
        const User = {
          name: getNameFromEmail(decodedUser.email),
          ...decodedUser,
        };
        setUser(User);
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    const decodedUser = decodeToken(token);
    const User = {
      name: getNameFromEmail(decodedUser.email),
      ...decodedUser,
    };
    setUser(User);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
