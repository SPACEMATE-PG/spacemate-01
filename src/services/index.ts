import { googleSheetsConfig } from '@/config/googleSheets';
import GoogleSheetsService from './GoogleSheetsService';

// Service instance cache
let googleSheetsService: GoogleSheetsService | null = null;

// Factory function to get or create Google Sheets service
export const getGoogleSheetsService = (): GoogleSheetsService => {
  if (!googleSheetsService) {
    if (!googleSheetsConfig.apiKey || !googleSheetsConfig.spreadsheetId) {
      throw new Error('Google Sheets configuration is missing. Please check your .env file.');
    }
    googleSheetsService = new GoogleSheetsService(
      googleSheetsConfig.spreadsheetId,
      googleSheetsConfig.apiKey
    );
  }
  return googleSheetsService;
};

// Export all services from this file 