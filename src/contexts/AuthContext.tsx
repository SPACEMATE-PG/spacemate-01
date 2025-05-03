
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole, User } from "@/types";

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  updateUser: (user: User) => void; // Added this line
}

// Default users for development purposes
const demoUsers = {
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "vignesh2906vi@gmail.com",
    role: UserRole.ADMIN,
    profileImage: "/placeholder.svg"
  },
  guest: {
    id: "guest-1",
    name: "Vignesh",
    email: "vignesh2906vi@gmail.com",
    role: UserRole.PG_GUEST,
    roomNumber: "101",
    joinDate: "2023-01-01",
    endDate: "2024-01-01",
    profileImage: "/placeholder.svg"
  }
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: UserRole.PUBLIC,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  setRole: () => {},
  updateUser: () => {}, // Added this line
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PUBLIC);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // In a real app, we would check for an existing session here
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedRole = localStorage.getItem("userRole");
    
    if (savedUser && savedRole) {
      setCurrentUser(JSON.parse(savedUser));
      setUserRole(savedRole as UserRole);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, we would make an API call to authenticate
    let user: User | null = null;

    if (role === UserRole.ADMIN && email === "vignesh2906vi@gmail.com" && password === "vignesh#@123") {
      user = demoUsers.admin;
    } else if (role === UserRole.PG_GUEST && email === "vignesh2906vi@gmail.com" && password === "vignesh#@123") {
      user = demoUsers.guest;
    }

    if (user) {
      setCurrentUser(user);
      setUserRole(role);
      setIsAuthenticated(true);
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", role);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(UserRole.PUBLIC);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
  };

  const setRole = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  // Add the updateUser function implementation
  const updateUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole,
        isAuthenticated,
        login,
        logout,
        setRole,
        updateUser, // Added this line
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
