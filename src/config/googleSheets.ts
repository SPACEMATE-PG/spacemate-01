// Try to get values from environment variables first, then fallback to localStorage or window.ENV
const getApiKey = (): string => {
  if (import.meta.env.VITE_GOOGLE_SHEETS_API_KEY) {
    return import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  }
  
  try {
    // Try localStorage
    const localApiKey = localStorage.getItem('googleSheetsApiKey');
    if (localApiKey) return localApiKey;
    
    // Try window.ENV fallback
    if (typeof window !== 'undefined' && window.ENV && window.ENV.VITE_GOOGLE_SHEETS_API_KEY) {
      return window.ENV.VITE_GOOGLE_SHEETS_API_KEY;
    }
    
    return '';
  } catch (e) {
    // localStorage might not be available in SSR context
    return '';
  }
};

const getSpreadsheetId = (): string => {
  if (import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID) {
    return import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
  }
  
  try {
    // Try localStorage
    const localSpreadsheetId = localStorage.getItem('googleSheetsSpreadsheetId');
    if (localSpreadsheetId) return localSpreadsheetId;
    
    // Try window.ENV fallback
    if (typeof window !== 'undefined' && window.ENV && window.ENV.VITE_GOOGLE_SHEETS_SPREADSHEET_ID) {
      return window.ENV.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
    }
    
    return '';
  } catch (e) {
    // localStorage might not be available in SSR context
    return '';
  }
};

// Log environment variables for debugging
console.log('Google Sheets Configuration:', {
  apiKeyFromEnv: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY ? 'Set (hidden)' : 'Not set',
  spreadsheetIdFromEnv: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID ? 'Set' : 'Not set',
  apiKeyFromLocalStorage: typeof localStorage !== 'undefined' && localStorage.getItem('googleSheetsApiKey') ? 'Set (hidden)' : 'Not set',
  spreadsheetIdFromLocalStorage: typeof localStorage !== 'undefined' && localStorage.getItem('googleSheetsSpreadsheetId') ? 'Set' : 'Not set',
  allEnvKeys: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_'))
});

export const googleSheetsConfig = {
  apiKey: getApiKey(),
  spreadsheetId: getSpreadsheetId(),
};

/**
 * Google Sheets Structure Guide:
 * 
 * Required sheets and their column headers:
 *
 * 1. Users:
 *    - id, name, email, role, adminSubRole, profileImage, roomNumber, joinDate, endDate
 * 
 * 2. Rooms:
 *    - id, roomNumber, capacity, occupied, type, price, amenities, images, available
 * 
 * 3. Meals:
 *    - id, date, mealType, menu, isActive
 * 
 * 4. MealResponses:
 *    - id, userId, mealId, attending, response
 * 
 * 5. Notifications:
 *    - id, userId, title, message, read, createdAt, type, requiresAction, actionId
 * 
 * 6. Payments:
 *    - id, userId, amount, type, status, date, description
 * 
 * 7. PGProperties:
 *    - id, name, address, city, state, pincode, description, amenities, rules, images, logo, rating, totalRooms, occupiedRooms, monthlyRent, securityDeposit, contactNumber, managerName, established
 */ 