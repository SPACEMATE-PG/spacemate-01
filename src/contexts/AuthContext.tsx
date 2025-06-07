
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole, AdminSubRole, User } from "@/types";

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  adminSubRole: AdminSubRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, subRole?: AdminSubRole) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  setAdminSubRole: (subRole: AdminSubRole) => void;
  updateUser: (user: User) => void;
}

// Default users for development purposes
const demoUsers = {
  superAdmin: {
    id: "super-admin-1",
    name: "Super Admin",
    email: "vignesh2906vi@gmail.com",
    role: UserRole.ADMIN,
    adminSubRole: AdminSubRole.SUPER_ADMIN,
    profileImage: "/placeholder.svg"
  },
  pgManager: {
    id: "admin-1",
    name: "PG Manager",
    email: "vignesh2906vi@gmail.com",
    role: UserRole.ADMIN,
    adminSubRole: AdminSubRole.PG_MANAGER,
    profileImage: "/placeholder.svg"
  },
  warden: {
    id: "warden-1",
    name: "Warden User",
    email: "vignesh2906vi@gmail.com",
    role: UserRole.ADMIN,
    adminSubRole: AdminSubRole.WARDEN,
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
  adminSubRole: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  setRole: () => {},
  setAdminSubRole: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PUBLIC);
  const [adminSubRole, setAdminSubRoleState] = useState<AdminSubRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // In a real app, we would check for an existing session here
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedRole = localStorage.getItem("userRole");
    const savedAdminSubRole = localStorage.getItem("adminSubRole");
    
    if (savedUser && savedRole) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setUserRole(savedRole as UserRole);
      if (savedAdminSubRole) {
        setAdminSubRoleState(savedAdminSubRole as AdminSubRole);
      }
      setIsAuthenticated(true);
      console.log("Auth restored:", { role: savedRole, user: user.name, subRole: savedAdminSubRole });
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole, subRole?: AdminSubRole) => {
    console.log("Login attempt:", { email, role, subRole });
    
    // In a real app, we would make an API call to authenticate
    let user: User | null = null;

    if (role === UserRole.ADMIN && email === "vignesh2906vi@gmail.com" && password === "vignesh#@123") {
      if (subRole === AdminSubRole.SUPER_ADMIN) {
        user = demoUsers.superAdmin;
      } else if (subRole === AdminSubRole.PG_MANAGER) {
        user = demoUsers.pgManager;
      } else if (subRole === AdminSubRole.WARDEN) {
        user = demoUsers.warden;
      }
    } else if (role === UserRole.PG_GUEST && email === "vignesh2906vi@gmail.com" && password === "vignesh#@123") {
      user = demoUsers.guest;
    }

    if (user) {
      setCurrentUser(user);
      setUserRole(role);
      setAdminSubRoleState(subRole || null);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", role);
      if (subRole) {
        localStorage.setItem("adminSubRole", subRole);
      } else {
        localStorage.removeItem("adminSubRole");
      }
      
      console.log("Login successful:", { role, subRole, userName: user.name });
    } else {
      console.error("Login failed: Invalid credentials");
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(UserRole.PUBLIC);
    setAdminSubRoleState(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminSubRole");
    console.log("User logged out");
  };

  const setRole = (role: UserRole) => {
    console.log("Setting role:", role);
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const setAdminSubRole = (subRole: AdminSubRole) => {
    setAdminSubRoleState(subRole);
    localStorage.setItem("adminSubRole", subRole);
  };

  const updateUser = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole,
        adminSubRole,
        isAuthenticated,
        login,
        logout,
        setRole,
        setAdminSubRole,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
