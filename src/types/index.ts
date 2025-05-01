
// Define user roles
export enum UserRole {
  ADMIN = "admin",
  PG_GUEST = "guest",
  PUBLIC = "public",
}

// Room interfaces
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

// Meal interfaces
export interface Meal {
  id: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner";
  menu: string;
  isActive: boolean;
}

// User interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roomNumber?: string;
  joinDate?: string;
  endDate?: string;
  profileImage?: string;
}

// Booking interface
export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "cancelled";
  paymentStatus: "pending" | "paid";
  amount: number;
}

// Notification interface
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

// MealResponse interface
export interface MealResponse {
  id: string;
  userId: string;
  mealId: string;
  attending: boolean;
  response: "yes" | "no" | "pending";
}

// Hostel interface
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

// Review interface
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Payment interface
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  type: "booking" | "monthly" | "service";
  status: "pending" | "completed" | "failed";
  date: string;
  description: string;
}
