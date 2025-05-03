
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.48c34bbc875e46d0b136846e3ce540e6',
  appName: 'space-mate-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://48c34bbc-875e-46d0-b136-846e3ce540e6.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#9b87f5",
      splashFullScreen: true,
      splashImmersive: true
    }
  },
  ios: {
    contentInset: "always"
  },
  android: {
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
