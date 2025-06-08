export enum UserRole {
  ADMIN = "admin",
  PG_GUEST = "guest",
  PUBLIC = "public"
}

export enum AdminSubRole {
  SUPER_ADMIN = "super_admin",
  PG_MANAGER = "pg_manager", 
  WARDEN = "warden"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  adminSubRole?: AdminSubRole; // Added for admin sub-roles
  profileImage?: string;
  roomNumber?: string;
  joinDate?: string;
  endDate?: string;
  pgId?: string; // Added for PG association
}

export interface Room {
  id: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  type: string;
  price: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Meal {
  id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner";
  menu: string;
  isActive: boolean;
}

export interface MealResponse {
  id: string;
  userId: string;
  mealId: string;
  attending: boolean;
  response: "yes" | "no" | "pending";
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: "meal" | "payment" | "announcement" | "service";
  requiresAction?: boolean;
  actionId?: string;
}

export interface Hostel {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
  amenities: string[];
  rules: string[];
  images: string[];
  logo: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  type: "monthly" | "service" | "deposit";
  status: "pending" | "completed" | "failed";
  date: string;
  description: string;
}

export interface PGProperty {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  description: string;
  amenities: string[];
  rules: string[];
  images: string[];
  logo: string;
  rating: number;
  totalRooms: number;
  occupiedRooms: number;
  monthlyRent: number;
  securityDeposit: number;
  contactNumber: string;
  managerName: string;
  established: string;
}
