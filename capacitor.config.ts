
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.spacemate',
  appName: 'space-mate-app',
  webDir: 'dist',
  
  //server: {
    //url: "http://192.168.109.48:8080",
    //cleartext: true
  //},
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#7C5DFA",
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
