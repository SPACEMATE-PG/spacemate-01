import { SheetNames } from '@/types/googleSheets';
import DataService from '@/services/DataService';
import { googleSheetsConfig } from '@/config/googleSheets';
import { proxyFetch } from '../services/CorsProxy';

// Check if Google Sheets configuration is available
const validateConfig = () => {
  if (!googleSheetsConfig.apiKey || !googleSheetsConfig.spreadsheetId) {
    console.error('Google Sheets configuration is missing. Please check your .env file in the root directory.');
    console.error('Required variables:');
    console.error('- VITE_GOOGLE_SHEETS_API_KEY');
    console.error('- VITE_GOOGLE_SHEETS_SPREADSHEET_ID');
    console.error('Current values:', { 
      apiKey: googleSheetsConfig.apiKey ? '***' : 'missing',
      spreadsheetId: googleSheetsConfig.spreadsheetId || 'missing'
    });
    return false;
  }
  return true;
};

/**
 * This utility helps with setting up the Google Sheets for the first time.
 * It creates the necessary headers in each sheet based on the data model.
 */

// Define headers for each sheet
const sheetHeaders = {
  [SheetNames.Users]: ['id', 'name', 'email', 'role', 'adminSubRole', 'profileImage', 'roomNumber', 'joinDate', 'endDate'],
  [SheetNames.Rooms]: ['id', 'roomNumber', 'capacity', 'occupied', 'type', 'price', 'amenities', 'images', 'available'],
  [SheetNames.Meals]: ['id', 'date', 'mealType', 'menu', 'isActive'],
  [SheetNames.MealResponses]: ['id', 'userId', 'mealId', 'attending', 'response'],
  [SheetNames.Notifications]: ['id', 'userId', 'title', 'message', 'read', 'createdAt', 'type', 'requiresAction', 'actionId'],
  [SheetNames.Payments]: ['id', 'userId', 'amount', 'type', 'status', 'date', 'description'],
  [SheetNames.PGProperties]: [
    'id', 'name', 'address', 'city', 'state', 'pincode', 'description', 
    'amenities', 'rules', 'images', 'logo', 'rating', 'totalRooms', 
    'occupiedRooms', 'monthlyRent', 'securityDeposit', 'contactNumber', 
    'managerName', 'established'
  ],
  [SheetNames.UserRegistration]: [
    'id', 'name', 'email', 'phone', 'address', 'gender', 'emergencyContact',
    'registrationDate', 'status', 'notes'
  ]
};

// Direct access to the Sheets API with fetch
const fetchSheetData = async (range: string) => {
  if (!validateConfig()) {
    throw new Error('Google Sheets configuration is missing. Please check your .env file in the root directory.');
  }
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsConfig.spreadsheetId}/values/${range}?key=${googleSheetsConfig.apiKey}`;
  
  const response = await proxyFetch(url);
  if (!response.ok) {
    throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

const updateSheetData = async (range: string, values: any[][]) => {
  if (!validateConfig()) {
    throw new Error('Google Sheets configuration is missing. Please check your .env file in the root directory.');
  }
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsConfig.spreadsheetId}/values/${range}?key=${googleSheetsConfig.apiKey}`;
  
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
};

const clearSheetData = async (range: string) => {
  if (!validateConfig()) {
    throw new Error('Google Sheets configuration is missing. Please check your .env file in the root directory.');
  }
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsConfig.spreadsheetId}/values/${range}:clear?key=${googleSheetsConfig.apiKey}`;
  
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
};

/**
 * Initializes all sheets with headers and optionally populates with mock data
 */
export const initializeSheets = async (populateWithMockData = false): Promise<void> => {
  try {    
    // Validate configuration first
    if (!validateConfig()) {
      throw new Error('Google Sheets configuration is missing. Please check your .env file in the root directory.');
    }
    
    // For each sheet, set up headers
    for (const [sheetName, headers] of Object.entries(sheetHeaders)) {
      await initializeSheet(sheetName as SheetNames, headers);
    }
    
    // Optionally populate with mock data
    if (populateWithMockData) {
      await DataService.initializeGoogleSheetWithMockData();
    }
    
    console.log('Google Sheets successfully initialized');
  } catch (error) {
    console.error('Failed to initialize sheets:', error);
    throw error;
  }
};

/**
 * Initializes a single sheet with headers
 */
const initializeSheet = async (sheetName: SheetNames, headers: string[]): Promise<void> => {
  try {
    // Check if sheet already has headers
    try {
      const response = await fetchSheetData(`${sheetName}!1:1`);
      
      if (response.values && response.values.length > 0) {
        console.log(`Sheet ${sheetName} already initialized. Skipping.`);
        return;
      }
    } catch (e) {
      // Sheet might not exist or be empty, continue with initialization
    }
    
    // Set up headers
    await updateSheetData(`${sheetName}!A1`, [headers]);
    
    console.log(`Sheet ${sheetName} initialized with headers`);
  } catch (error) {
    console.error(`Failed to initialize sheet ${sheetName}:`, error);
    throw error;
  }
};

/**
 * Reset a specific sheet by clearing all data except headers
 */
export const resetSheet = async (sheetName: SheetNames): Promise<void> => {
  try {
    // Clear all data except headers
    await clearSheetData(`${sheetName}!A2:Z1000`); // Clear from row 2 onwards
    
    console.log(`Sheet ${sheetName} has been reset`);
  } catch (error) {
    console.error(`Failed to reset sheet ${sheetName}:`, error);
    throw error;
  }
};

/**
 * Checks if the Google Sheets API is accessible with the current configuration
 */
export const checkGoogleSheetsAccess = async (): Promise<{success: boolean, message: string}> => {
  try {
    if (!validateConfig()) {
      return {
        success: false,
        message: 'Google Sheets configuration is missing. Please check your .env file in the root directory.'
      };
    }
    
    // Try to access the spreadsheet
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${googleSheetsConfig.spreadsheetId}?key=${googleSheetsConfig.apiKey}`;
    const response = await proxyFetch(url);
    
    if (!response.ok) {
      return {
        success: false,
        message: `Failed to access Google Sheets API: ${response.status} ${response.statusText}`
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      message: `Successfully connected to Google Sheet: "${data.properties?.title || 'Untitled'}"`
    };
  } catch (error) {
    return {
      success: false,
      message: `Error checking Google Sheets access: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}; 