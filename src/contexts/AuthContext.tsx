
import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole, AdminSubRole, User } from "@/types";

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole;
  adminSubRole: AdminSubRole | null;
  selectedPGId: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, subRole?: AdminSubRole, pgId?: string) => Promise<void>;
  logout: () => void;
  setRole: (role: UserRole) => void;
  setAdminSubRole: (subRole: AdminSubRole) => void;
  setPGId: (pgId: string) => void;
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
  selectedPGId: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  setRole: () => {},
  setAdminSubRole: () => {},
  setPGId: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.PUBLIC);
  const [adminSubRole, setAdminSubRoleState] = useState<AdminSubRole | null>(null);
  const [selectedPGId, setSelectedPGId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Clear any existing authentication state on app start to force proper flow
  useEffect(() => {
    // Clear localStorage on app initialization to ensure clean state
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminSubRole");
    localStorage.removeItem("selectedPGId");
    console.log("Authentication state cleared - starting fresh");
  }, []);

  const login = async (email: string, password: string, role: UserRole, subRole?: AdminSubRole, pgId?: string) => {
    console.log("Login attempt:", { email, role, subRole, pgId });
    
    // In a real app, we would make an API call to authenticate
    let user: User | null = null;

    if (role === UserRole.ADMIN && email === "vignesh2906vi@gmail.com" && password === "vignesh#@123") {
      if (subRole === AdminSubRole.SUPER_ADMIN) {
        user = { ...demoUsers.superAdmin, pgId };
      } else if (subRole === AdminSubRole.PG_MANAGER) {
        user = { ...demoUsers.pgManager, pgId };
      } else if (subRole === AdminSubRole.WARDEN) {
        user = { ...demoUsers.warden, pgId };
      }
    } else if (role === UserRole.PG_GUEST && email === "vignesh2906vi@gmail.com" && password === "vignesh#@123") {
      user = { ...demoUsers.guest, pgId };
    }

    if (user) {
      setCurrentUser(user);
      setUserRole(role);
      setAdminSubRoleState(subRole || null);
      setSelectedPGId(pgId || null);
      setIsAuthenticated(true);
      
      // Store in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", role);
      if (subRole) {
        localStorage.setItem("adminSubRole", subRole);
      } else {
        localStorage.removeItem("adminSubRole");
      }
      if (pgId) {
        localStorage.setItem("selectedPGId", pgId);
      } else {
        localStorage.removeItem("selectedPGId");
      }
      
      console.log("Login successful:", { role, subRole, pgId, userName: user.name });
    } else {
      console.error("Login failed: Invalid credentials");
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(UserRole.PUBLIC);
    setAdminSubRoleState(null);
    setSelectedPGId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminSubRole");
    localStorage.removeItem("selectedPGId");
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

  const setPGId = (pgId: string) => {
    setSelectedPGId(pgId);
    localStorage.setItem("selectedPGId", pgId);
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
        selectedPGId,
        isAuthenticated,
        login,
        logout,
        setRole,
        setAdminSubRole,
        setPGId,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
