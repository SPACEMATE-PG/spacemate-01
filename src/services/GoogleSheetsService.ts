import { Room, Meal, Notification, User, Payment, MealResponse, PGProperty, UserRegistration } from '@/types';
import { proxyFetch } from './CorsProxy.js';

// Define sheet names
const SHEETS = {
  USERS: 'Users',
  ROOMS: 'Rooms',
  MEALS: 'Meals',
  MEAL_RESPONSES: 'MealResponses',
  NOTIFICATIONS: 'Notifications',
  PAYMENTS: 'Payments',
  PG_PROPERTIES: 'PGProperties',
  USER_REGISTRATION: 'UserRegistration'
};

class GoogleSheetsService {
  public readonly spreadsheetId: string;
  private apiKey: string;

  constructor(spreadsheetId: string, apiKey: string) {
    this.spreadsheetId = spreadsheetId;
    this.apiKey = apiKey;
  }

  // Helper method to fetch data from Google Sheets API
  private async fetchSheetData(range: string): Promise<any> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
    
    const response = await proxyFetch(url);
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Helper method to update data in Google Sheets API
  private async updateRangeValues(range: string, values: any[][]): Promise<any> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}?key=${this.apiKey}`;
    
    const response = await proxyFetch(`${url}&valueInputOption=RAW`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: values
      })
    });
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Helper method to clear data in Google Sheets API
  private async clearSheetData(range: string): Promise<any> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${range}:clear?key=${this.apiKey}`;
    
    const response = await proxyFetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  // Generic method to get all data from a sheet
  private async getSheetData(sheetName: string): Promise<any[]> {
    try {
      const response = await this.fetchSheetData(sheetName);

      const rows = response.values;
      if (!rows || rows.length === 0) {
        console.log(`No data found in sheet: ${sheetName}`);
        return [];
      }

      // First row contains headers
      const headers = rows[0];
      
      // Convert rows to objects with header keys
      return rows.slice(1).map(row => {
        const obj: any = {};
        headers.forEach((header: string, i: number) => {
          // Convert string values to appropriate types
          let value = row[i] || '';
          
          // Parse booleans
          if (value === 'true') value = true;
          else if (value === 'false') value = false;
          
          // Parse numbers
          else if (!isNaN(Number(value)) && value !== '') value = Number(value);
          
          // Parse arrays (stored as comma-separated values)
          else if (value.includes(',')) {
            // Only convert to array if it looks like an array
            const possibleArray = value.split(',').map(item => item.trim());
            if (header.endsWith('s') && possibleArray.length > 1) {
              value = possibleArray;
            }
          }
          
          obj[header] = value;
        });
        return obj;
      });
    } catch (error) {
      console.error(`Error fetching data from sheet ${sheetName}:`, error);
      throw error;
    }
  }

  // Generic method to update data in a sheet
  private async updateSheetData(sheetName: string, data: any[]): Promise<void> {
    try {
      // First, get the current headers to ensure we use the right columns
      const headerResponse = await this.fetchSheetData(`${sheetName}!1:1`);
      
      const headers = headerResponse.values[0];

      // Convert data objects to rows
      const rows = data.map(item => {
        return headers.map((header: string) => {
          let value = item[header];
          
          // Convert arrays to comma-separated strings
          if (Array.isArray(value)) value = value.join(', ');
          
          // Ensure all values are strings for Google Sheets
          return value !== undefined ? String(value) : '';
        });
      });

      // Add headers row
      const valuesForSheet = [headers, ...rows];

      // Clear existing data first
      await this.clearSheetData(sheetName);

      // Update with new data
      await this.updateRangeValues(`${sheetName}!A1`, valuesForSheet);
    } catch (error) {
      console.error(`Error updating sheet ${sheetName}:`, error);
      throw error;
    }
  }

  // Users methods
  async getUsers(): Promise<User[]> {
    return this.getSheetData(SHEETS.USERS) as Promise<User[]>;
  }

  async updateUsers(users: User[]): Promise<void> {
    return this.updateSheetData(SHEETS.USERS, users);
  }

  // Rooms methods
  async getRooms(): Promise<Room[]> {
    return this.getSheetData(SHEETS.ROOMS) as Promise<Room[]>;
  }

  async updateRooms(rooms: Room[]): Promise<void> {
    return this.updateSheetData(SHEETS.ROOMS, rooms);
  }

  // Meals methods
  async getMeals(): Promise<Meal[]> {
    return this.getSheetData(SHEETS.MEALS) as Promise<Meal[]>;
  }

  async updateMeals(meals: Meal[]): Promise<void> {
    return this.updateSheetData(SHEETS.MEALS, meals);
  }

  // Meal responses methods
  async getMealResponses(): Promise<MealResponse[]> {
    return this.getSheetData(SHEETS.MEAL_RESPONSES) as Promise<MealResponse[]>;
  }

  async updateMealResponses(responses: MealResponse[]): Promise<void> {
    return this.updateSheetData(SHEETS.MEAL_RESPONSES, responses);
  }

  // Notifications methods
  async getNotifications(): Promise<Notification[]> {
    return this.getSheetData(SHEETS.NOTIFICATIONS) as Promise<Notification[]>;
  }

  async updateNotifications(notifications: Notification[]): Promise<void> {
    return this.updateSheetData(SHEETS.NOTIFICATIONS, notifications);
  }

  // Payments methods
  async getPayments(): Promise<Payment[]> {
    return this.getSheetData(SHEETS.PAYMENTS) as Promise<Payment[]>;
  }

  async updatePayments(payments: Payment[]): Promise<void> {
    return this.updateSheetData(SHEETS.PAYMENTS, payments);
  }

  // PG Property methods
  async getPGProperties(): Promise<PGProperty[]> {
    return this.getSheetData(SHEETS.PG_PROPERTIES) as Promise<PGProperty[]>;
  }

  async updatePGProperties(properties: PGProperty[]): Promise<void> {
    return this.updateSheetData(SHEETS.PG_PROPERTIES, properties);
  }
  
  // User Registration methods
  async getUserRegistrations(): Promise<UserRegistration[]> {
    return this.getSheetData(SHEETS.USER_REGISTRATION) as Promise<UserRegistration[]>;
  }

  async updateUserRegistrations(registrations: UserRegistration[]): Promise<void> {
    return this.updateSheetData(SHEETS.USER_REGISTRATION, registrations);
  }
}

export default GoogleSheetsService; 