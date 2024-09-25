// src/typings/cordova-plugin-local-notifications.d.ts
declare module 'cordova-plugin-local-notifications' {
    interface CordovaPlugins {
      notification: {
        local: {
          schedule: (options: any) => void;
          cancel: (id: number) => void;
        };
      };
    }
  }
  