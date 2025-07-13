/**
 * Utility to check if environment variables are loaded correctly
 */

export const checkEnvVariables = () => {
  console.group('Environment Variables Check');
  
  // Check Vite env vars
  console.log('Vite Environment Variables:');
  console.log('- VITE_GOOGLE_SHEETS_API_KEY:', import.meta.env.VITE_GOOGLE_SHEETS_API_KEY ? 'Set (hidden)' : 'Not set');
  console.log('- VITE_GOOGLE_SHEETS_SPREADSHEET_ID:', import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || 'Not set');
  console.log('- VITE_USE_CORS_PROXY:', import.meta.env.VITE_USE_CORS_PROXY || 'Not set');
  console.log('- VITE_CORS_PROXY_URL:', import.meta.env.VITE_CORS_PROXY_URL || 'Not set');
  
  // Check window.ENV
  if (typeof window !== 'undefined' && window.ENV) {
    console.log('\nWindow.ENV Variables:');
    console.log('- VITE_GOOGLE_SHEETS_API_KEY:', window.ENV.VITE_GOOGLE_SHEETS_API_KEY ? 'Set (hidden)' : 'Not set');
    console.log('- VITE_GOOGLE_SHEETS_SPREADSHEET_ID:', window.ENV.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || 'Not set');
    console.log('- VITE_USE_CORS_PROXY:', window.ENV.VITE_USE_CORS_PROXY || 'Not set');
    console.log('- VITE_CORS_PROXY_URL:', window.ENV.VITE_CORS_PROXY_URL || 'Not set');
  } else {
    console.log('\nWindow.ENV is not available');
  }
  
  // Check localStorage
  try {
    console.log('\nLocalStorage Variables:');
    console.log('- googleSheetsApiKey:', localStorage.getItem('googleSheetsApiKey') ? 'Set (hidden)' : 'Not set');
    console.log('- googleSheetsSpreadsheetId:', localStorage.getItem('googleSheetsSpreadsheetId') || 'Not set');
  } catch (e) {
    console.log('\nLocalStorage is not available');
  }
  
  console.groupEnd();
  
  return {
    viteEnvVars: {
      apiKey: !!import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
      spreadsheetId: !!import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID,
      useCorsProxy: import.meta.env.VITE_USE_CORS_PROXY === 'true',
      corsProxyUrl: !!import.meta.env.VITE_CORS_PROXY_URL
    },
    windowEnvVars: typeof window !== 'undefined' && window.ENV ? {
      apiKey: !!window.ENV.VITE_GOOGLE_SHEETS_API_KEY,
      spreadsheetId: !!window.ENV.VITE_GOOGLE_SHEETS_SPREADSHEET_ID,
      useCorsProxy: window.ENV.VITE_USE_CORS_PROXY === 'true',
      corsProxyUrl: !!window.ENV.VITE_CORS_PROXY_URL
    } : null,
    localStorageVars: {
      apiKey: !!localStorage.getItem('googleSheetsApiKey'),
      spreadsheetId: !!localStorage.getItem('googleSheetsSpreadsheetId')
    }
  };
};

// Add to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).checkEnvVariables = checkEnvVariables;
}

export default checkEnvVariables; 