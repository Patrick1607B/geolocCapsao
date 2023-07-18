import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'geoloc',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
