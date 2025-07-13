# Setting Up Google Sheets as a Data Store

This guide explains how to use Google Sheets as a data store for the Space Mate app.

## Prerequisites

1. A Google account
2. Access to the [Google Cloud Console](https://console.cloud.google.com)
3. Basic understanding of Google Sheets

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a Project" at the top of the page
3. Click "NEW PROJECT"
4. Enter a project name (e.g., "Space Mate App") and click "CREATE"

## Step 2: Enable the Google Sheets API

1. In your new project, go to the navigation menu and select "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on "Google Sheets API" and then click "ENABLE"

## Step 3: Create API Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" and select "API key"
3. Copy the generated API key - you'll need it later
4. For better security, click "RESTRICT KEY" and:
   - Under "API restrictions," select "Restrict key"
   - Select "Google Sheets API" from the dropdown
   - Click "SAVE"

## Step 4: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to something like "Space Mate Data"
3. Get the spreadsheet ID from the URL:
   - The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`
   - Copy the `YOUR_SPREADSHEET_ID` part

## Step 5: Configure Environment Variables

Create or edit the `.env` file in your project root and add:

```
VITE_GOOGLE_SHEETS_API_KEY=your_google_api_key_here
VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
```

## Step 6: Share Your Spreadsheet

1. Click the "Share" button in your Google Spreadsheet
2. Set it to "Anyone with the link" can view
3. Copy the link and save it for reference

## Step 7: Initialize Your Sheets

The Space Mate app needs specific sheets (tabs) with certain column headers:

You can either:

1. **Use the Admin Panel**: 
   - Log in as a Super Admin
   - Go to Settings > Data
   - Use the Google Sheets Setup interface to initialize your sheets

2. **Manually Create the Required Sheets**:
   Create the following sheets with these column headers:

   - **Users**: id, name, email, role, adminSubRole, profileImage, roomNumber, joinDate, endDate
   - **Rooms**: id, roomNumber, capacity, occupied, type, price, amenities, images, available
   - **Meals**: id, date, mealType, menu, isActive
   - **MealResponses**: id, userId, mealId, attending, response
   - **Notifications**: id, userId, title, message, read, createdAt, type, requiresAction, actionId
   - **Payments**: id, userId, amount, type, status, date, description
   - **PGProperties**: id, name, address, city, state, pincode, description, amenities, rules, images, logo, rating, totalRooms, occupiedRooms, monthlyRent, securityDeposit, contactNumber, managerName, established

## Data Format Tips

- Boolean values should be stored as "true" or "false" (as strings)
- Arrays (like amenities) should be stored as comma-separated values (e.g., "WiFi, AC, TV")
- Dates should be stored in ISO format (YYYY-MM-DD)

## Cross-Origin Resource Sharing (CORS) Setup

Since this implementation accesses Google Sheets directly from the browser, you will likely face CORS issues. We've provided a few solutions:

1. **For development**: The app includes a CORS proxy utility that can be enabled in your .env file:
   ```
   VITE_USE_CORS_PROXY=true
   ```

2. **For production**: Several more robust solutions are available.

For detailed instructions on addressing CORS issues, see [CORS Solution Guide](./CORS_SOLUTION.md)

## Troubleshooting

- **API Key not working**: Make sure you've enabled the Google Sheets API for your project
- **CORS errors**: Look for errors in the browser console containing "Access-Control-Allow-Origin". You'll need a CORS proxy solution
- **Access denied**: Ensure your spreadsheet is shared with "Anyone with the link" for viewing
- **Data not loading**: Check your browser console for errors and verify your API key and spreadsheet ID
- **Rate limits**: Google APIs have usage limits. For high-volume applications, consider upgrading to a paid tier

## Security Considerations

- The API key included in your frontend can be seen by users. For production use, consider using a backend proxy.
- Don't store sensitive information in the Google Sheet
- Restrict your API key to only allow access from your application's domains
- Consider implementing additional authentication mechanisms for write operations 