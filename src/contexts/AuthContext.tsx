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

interface Credentials {
  email: string;
  password: string;
}

interface AdminCredentials {
  [AdminSubRole.SUPER_ADMIN]: Credentials;
  [AdminSubRole.PG_ADMIN]: Credentials;
  [AdminSubRole.WARDEN]: Credentials;
}

interface DefaultCredentials {
  [UserRole.ADMIN]: AdminCredentials;
  [UserRole.PG_GUEST]: Credentials;
  [UserRole.PUBLIC]: Credentials;
}

// Default users for development purposes
const demoUsers = {
  superAdmin: {
    id: "super-admin-1",
    name: "Super Admin",
    email: "superadmin@test.com",
    role: UserRole.ADMIN,
    adminSubRole: AdminSubRole.SUPER_ADMIN,
    profileImage: "/placeholder.svg"
  },
  pgAdmin: {
    id: "pg-admin-1",
    name: "PG Admin",
    email: "pgadmin@test.com",
    role: UserRole.ADMIN,
    adminSubRole: AdminSubRole.PG_ADMIN,
    profileImage: "/placeholder.svg"
  },
  warden: {
    id: "warden-1",
    name: "Warden User",
    email: "warden@test.com",
    role: UserRole.ADMIN,
    adminSubRole: AdminSubRole.WARDEN,
    profileImage: "/placeholder.svg"
  },
  guest: {
    id: "guest-1",
    name: "Guest User",
    email: "guest@test.com",
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
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const storedRole = localStorage.getItem("userRole");
    return storedRole ? storedRole as UserRole : UserRole.PUBLIC;
  });
  
  const [adminSubRole, setAdminSubRoleState] = useState<AdminSubRole | null>(() => {
    const storedSubRole = localStorage.getItem("adminSubRole");
    return storedSubRole ? storedSubRole as AdminSubRole : null;
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Check for remembered credentials on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const rememberedRole = localStorage.getItem("rememberedRole") as UserRole | null;
    const rememberedSubRole = localStorage.getItem("rememberedSubRole") as AdminSubRole | null;
    
    if (rememberedEmail && rememberedPassword && rememberedRole) {
      // Auto-login with remembered credentials
      login(rememberedEmail, rememberedPassword, rememberedRole, rememberedSubRole || undefined)
        .catch(() => {
          // Clear remembered credentials if login fails
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          localStorage.removeItem("rememberedRole");
          localStorage.removeItem("rememberedSubRole");
        });
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole, adminSubRole?: AdminSubRole) => {
    try {
      console.log("AuthContext.login called with:", { email, role, adminSubRole });
      // Default credentials for testing
      const defaultCredentials: DefaultCredentials = {
        [UserRole.ADMIN]: {
          [AdminSubRole.SUPER_ADMIN]: { email: "admin@test.com", password: "admin123" },
          [AdminSubRole.PG_ADMIN]: { email: "admin@test.com", password: "admin123" },
          [AdminSubRole.WARDEN]: { email: "admin@test.com", password: "admin123" }
        },
        [UserRole.PG_GUEST]: { email: "admin@test.com", password: "admin123" },
        [UserRole.PUBLIC]: { email: "admin@test.com", password: "admin123" }
      };

      // Check if using default credentials
      if (role === UserRole.ADMIN && adminSubRole) {
        const defaultAdmin = defaultCredentials[UserRole.ADMIN][adminSubRole];
        if (email === defaultAdmin.email && password === defaultAdmin.password) {
          let user: User;
          switch (adminSubRole) {
            case AdminSubRole.SUPER_ADMIN:
              user = demoUsers.superAdmin;
              break;
            case AdminSubRole.PG_ADMIN:
              user = demoUsers.pgAdmin;
              break;
            case AdminSubRole.WARDEN:
              user = demoUsers.warden;
              break;
            default:
              throw new Error("Invalid admin sub-role");
          }
          console.log("Setting user state for admin:", { user, role, adminSubRole });
          setCurrentUser(user);
          setIsAuthenticated(true);
          setUserRole(role);
          setAdminSubRoleState(adminSubRole);
          
          // Persist authentication state
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("userRole", role);
          localStorage.setItem("adminSubRole", adminSubRole);
          localStorage.setItem("isAuthenticated", "true");
          console.log("Authentication state saved to localStorage");
          return;
        }
      } else {
        const defaultUser = defaultCredentials[role] as Credentials;
        if (email === defaultUser.email && password === defaultUser.password) {
          const user = role === UserRole.PG_GUEST ? demoUsers.guest : {
            id: "public-1",
            name: "Public User",
            email: email,
            role: role,
            profileImage: "/placeholder.svg"
          };
          console.log("Setting user state for non-admin:", { user, role });
          setCurrentUser(user);
          setIsAuthenticated(true);
          setUserRole(role);
          
          // Persist authentication state
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("userRole", role);
          localStorage.setItem("isAuthenticated", "true");
          console.log("Authentication state saved to localStorage");
          return;
        }
      }

      throw new Error("Invalid credentials");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(UserRole.PUBLIC);
    setAdminSubRoleState(null);
    setIsAuthenticated(false);
    
    // Clear all auth-related items from localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminSubRole");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("rememberedEmail");
    localStorage.removeItem("rememberedPassword");
    localStorage.removeItem("rememberedRole");
    localStorage.removeItem("rememberedSubRole");
    
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
