import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.refugeemap.app',
  appName: 'خريطة اللاجئ',
  webDir: 'out',
  bundledWebRuntime: false,
  /*server: {
    iosScheme: "https",
    androidScheme: "https",
    url: "https://dev.geckse.de/webrtc",
    allowNavigation: ["*.geckse.de"]
  }*/
};

export default config;
