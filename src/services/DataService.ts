import { Room, Meal, Notification, User, Payment, MealResponse, PGProperty, UserRegistration } from '@/types';
import { getGoogleSheetsService } from './index';
import { v4 as uuidv4 } from 'uuid';

// Import mock data (for fallback and initial setup)
import { rooms as mockRooms, meals as mockMeals, notifications as mockNotifications, payments as mockPayments } from '@/data/mockData';

class DataService {
  // Cache for data to minimize API calls
  private roomsCache: Room[] | null = null;
  private mealsCache: Meal[] | null = null;
  private notificationsCache: Notification[] | null = null;
  private usersCache: User[] | null = null;
  private paymentsCache: Payment[] | null = null;
  private mealResponsesCache: MealResponse[] | null = null;
  private pgPropertiesCache: PGProperty[] | null = null;
  private userRegistrationsCache: UserRegistration[] | null = null;
  
  // Utility to handle failed API calls by using mock data or cached data
  private handleApiError<T>(error: any, cacheName: string, mockData?: T[]): T[] {
    console.error(`Error accessing Google Sheets data: ${error.message}`);
    console.log('Falling back to mock or cached data');
    
    // Return cache if available
    const cache = (this as any)[cacheName];
    if (cache) return cache;
    
    // Return mock data if provided
    if (mockData) return mockData;
    
    // Return empty array as last resort
    return [];
  }
  
  // USERS
  async getUsers(): Promise<User[]> {
    try {
      const service = getGoogleSheetsService();
      const users = await service.getUsers();
      this.usersCache = users;
      return users;
    } catch (error) {
      // For users, we'll return the cached data or an empty array
      return this.handleApiError<User>(error, 'usersCache', []);
    }
  }
  
  async addUser(user: Omit<User, 'id'>): Promise<User> {
    try {
      const newUser = { ...user, id: uuidv4() };
      const users = await this.getUsers();
      users.push(newUser as User);
      
      const service = getGoogleSheetsService();
      await service.updateUsers(users);
      this.usersCache = users;
      
      return newUser as User;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }
  
  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      const updatedUser = { ...users[userIndex], ...userData };
      users[userIndex] = updatedUser;
      
      const service = getGoogleSheetsService();
      await service.updateUsers(users);
      this.usersCache = users;
      
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  async deleteUser(userId: string): Promise<void> {
    try {
      const users = await this.getUsers();
      const filteredUsers = users.filter(user => user.id !== userId);
      
      if (filteredUsers.length === users.length) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      const service = getGoogleSheetsService();
      await service.updateUsers(filteredUsers);
      this.usersCache = filteredUsers;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
  
  // ROOMS
  async getRooms(): Promise<Room[]> {
    try {
      const service = getGoogleSheetsService();
      const rooms = await service.getRooms();
      this.roomsCache = rooms;
      return rooms;
    } catch (error) {
      return this.handleApiError<Room>(error, 'roomsCache', mockRooms);
    }
  }
  
  async addRoom(room: Omit<Room, 'id'>): Promise<Room> {
    try {
      const newRoom = { ...room, id: uuidv4() };
      const rooms = await this.getRooms();
      rooms.push(newRoom as Room);
      
      const service = getGoogleSheetsService();
      await service.updateRooms(rooms);
      this.roomsCache = rooms;
      
      return newRoom as Room;
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  }
  
  async updateRoom(roomId: string, roomData: Partial<Room>): Promise<Room> {
    try {
      const rooms = await this.getRooms();
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      
      if (roomIndex === -1) {
        throw new Error(`Room with ID ${roomId} not found`);
      }
      
      const updatedRoom = { ...rooms[roomIndex], ...roomData };
      rooms[roomIndex] = updatedRoom;
      
      const service = getGoogleSheetsService();
      await service.updateRooms(rooms);
      this.roomsCache = rooms;
      
      return updatedRoom;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  }
  
  async deleteRoom(roomId: string): Promise<void> {
    try {
      const rooms = await this.getRooms();
      const filteredRooms = rooms.filter(room => room.id !== roomId);
      
      if (filteredRooms.length === rooms.length) {
        throw new Error(`Room with ID ${roomId} not found`);
      }
      
      const service = getGoogleSheetsService();
      await service.updateRooms(filteredRooms);
      this.roomsCache = filteredRooms;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  }
  
  // Similar CRUD methods for other entities: meals, notifications, payments, etc.
  // Following the same pattern as users and rooms
  
  // USER REGISTRATION
  async getUserRegistrations(): Promise<UserRegistration[]> {
    try {
      const service = getGoogleSheetsService();
      const registrations = await service.getUserRegistrations();
      this.userRegistrationsCache = registrations;
      return registrations;
    } catch (error) {
      return this.handleApiError<UserRegistration>(error, 'userRegistrationsCache', []);
    }
  }
  
  async addUserRegistration(registration: Omit<UserRegistration, 'id'>): Promise<UserRegistration> {
    try {
      const newRegistration = { 
        ...registration, 
        id: uuidv4(),
        registrationDate: registration.registrationDate || new Date().toISOString().split('T')[0]
      };
      
      const registrations = await this.getUserRegistrations();
      registrations.push(newRegistration as UserRegistration);
      
      const service = getGoogleSheetsService();
      await service.updateUserRegistrations(registrations);
      this.userRegistrationsCache = registrations;
      
      return newRegistration as UserRegistration;
    } catch (error) {
      console.error('Error adding user registration:', error);
      throw error;
    }
  }
  
  async updateUserRegistration(id: string, data: Partial<UserRegistration>): Promise<UserRegistration> {
    try {
      const registrations = await this.getUserRegistrations();
      const index = registrations.findIndex(r => r.id === id);
      
      if (index === -1) {
        throw new Error(`User registration with ID ${id} not found`);
      }
      
      const updatedRegistration = { ...registrations[index], ...data };
      registrations[index] = updatedRegistration;
      
      const service = getGoogleSheetsService();
      await service.updateUserRegistrations(registrations);
      this.userRegistrationsCache = registrations;
      
      return updatedRegistration;
    } catch (error) {
      console.error('Error updating user registration:', error);
      throw error;
    }
  }
  
  async deleteUserRegistration(id: string): Promise<void> {
    try {
      const registrations = await this.getUserRegistrations();
      const filteredRegistrations = registrations.filter(r => r.id !== id);
      
      if (filteredRegistrations.length === registrations.length) {
        throw new Error(`User registration with ID ${id} not found`);
      }
      
      const service = getGoogleSheetsService();
      await service.updateUserRegistrations(filteredRegistrations);
      this.userRegistrationsCache = filteredRegistrations;
    } catch (error) {
      console.error('Error deleting user registration:', error);
      throw error;
    }
  }
  
  // Method to initialize Google Sheet with mock data (useful for setup)
  async initializeGoogleSheetWithMockData(): Promise<void> {
    try {
      const service = getGoogleSheetsService();
      
      // Initialize each sheet with mock data
      await service.updateRooms(mockRooms);
      await service.updateMeals(mockMeals);
      await service.updateNotifications(mockNotifications);
      await service.updatePayments(mockPayments);
      
      console.log('Google Sheet initialized with mock data');
    } catch (error) {
      console.error('Error initializing Google Sheet:', error);
      throw error;
    }
  }
}

export default new DataService(); 