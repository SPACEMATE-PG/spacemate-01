import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spacemate.app',
  appName: 'Space Mate',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    allowNavigation: ['*'],
    cleartext: true,
    hostname: 'localhost'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    backgroundColor: '#ffffff',
    hideLogs: false,
    allowBackForwardNavigationGestures: true,
    initialFocus: true,
    useLegacyBridge: false
  },
  ios: {
    allowsLinkPreview: true,
    scrollEnabled: true,
    contentInset: 'automatic',
    allowsBackForwardNavigationGestures: true,
    backgroundColor: '#ffffff',
    hideLogs: false,
    limitsNavigationsToAppBoundDomains: true,
    preferredContentMode: 'mobile'
  },
  plugins: {
    Keyboard: {
      resize: true,
      style: 'DARK',
      resizeOnFullScreen: true,
      keyboardAppearance: 'light',
      clearInputs: false,
      scrollAssist: true,
      hideKeyboardAccessoryBar: false
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
      showSpinner: true,
      spinnerColor: "#999999"
    },
    App: {
      backButtonBehavior: "history"
    }
  }
};

export default config;
