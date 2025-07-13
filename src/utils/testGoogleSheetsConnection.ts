import { checkGoogleSheetsAccess } from './sheetSetup';

/**
 * This is a simple utility to test the Google Sheets API connection.
 * Run this function from the browser console or a component to verify
 * that your Google Sheets API key and spreadsheet ID are working correctly.
 */
export const testGoogleSheetsConnection = async (): Promise<void> => {
  console.log('Testing Google Sheets connection...');
  
  try {
    const result = await checkGoogleSheetsAccess();
    
    if (result.success) {
      console.log('✅ Connection successful!');
      console.log(result.message);
    } else {
      console.error('❌ Connection failed!');
      console.error(result.message);
    }
  } catch (error) {
    console.error('❌ Error testing connection:', error);
  }
};

// Export a function that can be called from the browser console
if (typeof window !== 'undefined') {
  (window as any).testGoogleSheetsConnection = testGoogleSheetsConnection;
} 