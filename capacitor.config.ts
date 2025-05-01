
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a4bf828be7254ac4841ca36a26c524dc',
  appName: 'space-mate-app',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://a4bf828b-e725-4ac4-841c-a36a26c524dc.lovableproject.com?forceHideBadge=true",
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
