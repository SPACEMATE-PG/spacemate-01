import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { InfoIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { initializeSheets, resetSheet, checkGoogleSheetsAccess } from '@/utils/sheetSetup';
import { SheetNames } from '@/types/googleSheets';
import DataService from '@/services/DataService';
import { googleSheetsConfig } from '@/config/googleSheets';

const GoogleSheetsSetup = () => {
  const [apiKey, setApiKey] = useState<string>(googleSheetsConfig.apiKey || '');
  const [spreadsheetId, setSpreadsheetId] = useState<string>(googleSheetsConfig.spreadsheetId || '');
  const [status, setStatus] = useState<{
    message: string;
    type: 'info' | 'error' | 'success' | 'none';
  }>({ message: '', type: 'none' });
  const [loadMockData, setLoadMockData] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [selectedSheet, setSelectedSheet] = useState<SheetNames>(SheetNames.Users);

  const saveSettings = () => {
    try {
      // In a real app, you'd save these to .env or backend
      // For now, just display a message
      setStatus({
        message: 'Settings saved! Remember to add these values to your .env file.',
        type: 'success'
      });
      
      // In a real scenario we'd update environment variables
      // localStorage.setItem('VITE_GOOGLE_SHEETS_API_KEY', apiKey);
      // localStorage.setItem('VITE_GOOGLE_SHEETS_SPREADSHEET_ID', spreadsheetId);

      // For demo purposes, you could save to localStorage:
      localStorage.setItem('googleSheetsApiKey', apiKey);
      localStorage.setItem('googleSheetsSpreadsheetId', spreadsheetId);
      
      setTimeout(() => setStatus({ message: '', type: 'none' }), 5000);
    } catch (error: any) {
      setStatus({
        message: `Error saving settings: ${error.message}`,
        type: 'error'
      });
    }
  };

  const handleCheckConnection = async () => {
    try {
      setIsChecking(true);
      setStatus({
        message: 'Checking Google Sheets connection...',
        type: 'info'
      });

      const result = await checkGoogleSheetsAccess();
      
      setStatus({
        message: result.message,
        type: result.success ? 'success' : 'error'
      });
    } catch (error: any) {
      setStatus({
        message: `Error checking connection: ${error.message}`,
        type: 'error'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleInitializeSheets = async () => {
    try {
      setIsInitializing(true);
      setStatus({
        message: 'Initializing Google Sheets...',
        type: 'info'
      });

      await initializeSheets(loadMockData);
      
      setStatus({
        message: `Google Sheets successfully initialized${loadMockData ? ' with mock data' : ''}!`,
        type: 'success'
      });
    } catch (error: any) {
      setStatus({
        message: `Error initializing sheets: ${error.message}`,
        type: 'error'
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleResetSheet = async () => {
    try {
      setIsResetting(true);
      setStatus({
        message: `Resetting ${selectedSheet} sheet...`,
        type: 'info'
      });

      await resetSheet(selectedSheet);
      
      setStatus({
        message: `${selectedSheet} sheet successfully reset!`,
        type: 'success'
      });
    } catch (error: any) {
      setStatus({
        message: `Error resetting sheet: ${error.message}`,
        type: 'error'
      });
    } finally {
      setIsResetting(false);
    }
  };

  const testDirectApiAccess = async () => {
    try {
      setStatus({
        message: 'Testing direct API access...',
        type: 'info'
      });
      
      if (!apiKey || !spreadsheetId) {
        setStatus({
          message: 'API Key and Spreadsheet ID are required',
          type: 'error'
        });
        return;
      }
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
      console.log('Testing direct API access to:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Direct API Response:', data);
      
      if (response.ok) {
        setStatus({
          message: `Direct API access successful! Spreadsheet title: ${data.properties?.title || 'Untitled'}`,
          type: 'success'
        });
      } else {
        setStatus({
          message: `Direct API access failed: ${data.error?.message || 'Unknown error'}`,
          type: 'error'
        });
      }
    } catch (error: any) {
      console.error('Direct API access error:', error);
      setStatus({
        message: `Direct API access error: ${error.message}`,
        type: 'error'
      });
    }
  };

  const checkEnvVariables = () => {
    const envVariables = {
      VITE_GOOGLE_SHEETS_API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY ? 'Set (hidden)' : 'Not set',
      VITE_GOOGLE_SHEETS_SPREADSHEET_ID: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || 'Not set',
      VITE_USE_CORS_PROXY: import.meta.env.VITE_USE_CORS_PROXY || 'Not set',
      VITE_CORS_PROXY_URL: import.meta.env.VITE_CORS_PROXY_URL || 'Not set'
    };
    
    console.log('Environment Variables:', envVariables);
    
    setStatus({
      message: 'Environment variables logged to console. Check browser developer tools.',
      type: 'info'
    });
  };

  const renderStatusAlert = () => {
    if (status.type === 'none') return null;
    
    const icons = {
      info: <InfoIcon className="h-4 w-4" />,
      error: <AlertCircleIcon className="h-4 w-4" />,
      success: <CheckCircleIcon className="h-4 w-4" />,
    };

    return (
      <Alert variant={status.type === 'error' ? 'destructive' : 'default'} className="my-4">
        {icons[status.type]}
        <AlertTitle>{status.type.charAt(0).toUpperCase() + status.type.slice(1)}</AlertTitle>
        <AlertDescription>{status.message}</AlertDescription>
      </Alert>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Google Sheets Integration Setup</CardTitle>
        <CardDescription>
          Configure your Google Sheets integration to use as a data store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings">
          <TabsList className="mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="initialization">Initialization</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="debug">Debug</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Google API Key</Label>
                <Input 
                  id="apiKey" 
                  placeholder="Your Google API Key" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  This key must have Google Sheets API access enabled.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spreadsheetId">Spreadsheet ID</Label>
                <Input 
                  id="spreadsheetId" 
                  placeholder="Your Google Spreadsheet ID" 
                  value={spreadsheetId} 
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Find this in the URL of your Google Sheet: docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
                </p>
              </div>

              <div className="flex space-x-2">
                <Button onClick={saveSettings}>Save Settings</Button>
                <Button 
                  variant="outline" 
                  onClick={handleCheckConnection}
                  disabled={isChecking || !apiKey || !spreadsheetId}
                >
                  {isChecking ? 'Checking...' : 'Test Connection'}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="initialization">
            <div className="space-y-4">
              <p className="text-sm">
                Initialize your Google Sheets with the necessary tabs and column headers for Space Mate.
              </p>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="loadMockData" 
                  checked={loadMockData} 
                  onCheckedChange={(checked) => setLoadMockData(!!checked)}
                />
                <Label htmlFor="loadMockData">Load mock data into sheets</Label>
              </div>
              
              <Button 
                onClick={handleInitializeSheets} 
                disabled={isInitializing || !apiKey || !spreadsheetId}
              >
                {isInitializing ? 'Initializing...' : 'Initialize Sheets'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="maintenance">
            <div className="space-y-4">
              <p className="text-sm">
                Maintenance tools for managing your Google Sheets data.
              </p>

              <div className="space-y-2">
                <Label htmlFor="sheetSelect">Select Sheet</Label>
                <select 
                  id="sheetSelect" 
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={selectedSheet}
                  onChange={(e) => setSelectedSheet(e.target.value as SheetNames)}
                >
                  {Object.values(SheetNames).map((sheet) => (
                    <option key={sheet} value={sheet}>{sheet}</option>
                  ))}
                </select>
              </div>

              <Button 
                variant="destructive" 
                onClick={handleResetSheet} 
                disabled={isResetting || !apiKey || !spreadsheetId}
              >
                {isResetting ? 'Resetting...' : `Reset ${selectedSheet} Sheet`}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="debug">
            <div className="space-y-4">
              <p className="text-sm">
                Debug tools for troubleshooting Google Sheets integration.
              </p>
              
              <Alert className="bg-blue-50 border-blue-200">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Configuration Status</AlertTitle>
                <AlertDescription>
                  <div className="space-y-2 mt-2">
                    <div>
                      <span className="font-semibold">API Key:</span> {googleSheetsConfig.apiKey ? '✅ Set' : '❌ Missing'}
                    </div>
                    <div>
                      <span className="font-semibold">Spreadsheet ID:</span> {googleSheetsConfig.spreadsheetId ? '✅ Set' : '❌ Missing'}
                    </div>
                    <div>
                      <span className="font-semibold">CORS Proxy:</span> {import.meta.env.VITE_USE_CORS_PROXY === 'true' ? '✅ Enabled' : '❌ Disabled'}
                    </div>
                    <div>
                      <span className="font-semibold">Environment:</span> {import.meta.env.DEV ? 'Development' : 'Production'}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleCheckConnection}
                >
                  Test API Connection
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.log('Current Google Sheets Config:', {
                      apiKey: googleSheetsConfig.apiKey ? '***' : 'missing',
                      spreadsheetId: googleSheetsConfig.spreadsheetId
                    });
                  }}
                >
                  Log Config to Console
                </Button>
                <Button
                  variant="outline"
                  onClick={checkEnvVariables}
                >
                  Check Env Variables
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={testDirectApiAccess}
                >
                  Test Direct API Access
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {renderStatusAlert()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          Make sure your Google Sheet is shared with anyone who has the link (view-only)
        </p>
      </CardFooter>
    </Card>
  );
};

export default GoogleSheetsSetup; 