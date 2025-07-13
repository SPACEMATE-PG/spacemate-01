export interface GoogleSheetsConnectionConfig {
  apiKey: string;
  spreadsheetId: string;
}

export interface SheetData {
  range: string;
  majorDimension: 'ROWS' | 'COLUMNS';
  values: string[][];
}

export enum SheetNames {
  Users = 'Users',
  Rooms = 'Rooms',
  Meals = 'Meals',
  MealResponses = 'MealResponses',
  Notifications = 'Notifications',
  Payments = 'Payments',
  PGProperties = 'PGProperties',
  UserRegistration = 'UserRegistration'
}

// Helper type for sheet column definition
export interface SheetColumn {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array';
  required: boolean;
}

// Sheet column definitions
export const UserColumns: SheetColumn[] = [
  { name: 'id', type: 'string', required: true },
  { name: 'name', type: 'string', required: true },
  { name: 'email', type: 'string', required: true },
  { name: 'role', type: 'string', required: true },
  { name: 'adminSubRole', type: 'string', required: false },
  { name: 'profileImage', type: 'string', required: false },
  { name: 'roomNumber', type: 'string', required: false },
  { name: 'joinDate', type: 'string', required: false },
  { name: 'endDate', type: 'string', required: false },
];

export const RoomColumns: SheetColumn[] = [
  { name: 'id', type: 'string', required: true },
  { name: 'roomNumber', type: 'string', required: true },
  { name: 'capacity', type: 'number', required: true },
  { name: 'occupied', type: 'number', required: true },
  { name: 'type', type: 'string', required: true },
  { name: 'price', type: 'number', required: true },
  { name: 'amenities', type: 'array', required: false },
  { name: 'images', type: 'array', required: false },
  { name: 'available', type: 'boolean', required: true },
];

export const MealColumns: SheetColumn[] = [
  { name: 'id', type: 'string', required: true },
  { name: 'date', type: 'string', required: true },
  { name: 'mealType', type: 'string', required: true },
  { name: 'menu', type: 'string', required: true },
  { name: 'isActive', type: 'boolean', required: true },
];

export const UserRegistrationColumns: SheetColumn[] = [
  { name: 'id', type: 'string', required: true },
  { name: 'name', type: 'string', required: true },
  { name: 'email', type: 'string', required: true },
  { name: 'phone', type: 'string', required: true },
  { name: 'address', type: 'string', required: false },
  { name: 'gender', type: 'string', required: false },
  { name: 'emergencyContact', type: 'string', required: false },
  { name: 'registrationDate', type: 'date', required: true },
  { name: 'status', type: 'string', required: true },
  { name: 'notes', type: 'string', required: false },
];

// Additional column definitions follow same pattern for other entity types 