// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDAZ74CtvmeiXzZaA6vhg3teBXO0h7yt0g",
    authDomain: "spotify-app-44c3c.firebaseapp.com",
    projectId: "spotify-app-44c3c",
    storageBucket: "spotify-app-44c3c.appspot.com",
    messagingSenderId: "92545577676",
    appId: "1:92545577676:web:6c357fb47555c6a6c98869"
  },
  spotify:{
    client_id: '19c70b37b98a4cb78cf355ea7c36265e',
    client_secret: '4ce97b4ce3b04e0f90fe601850d0bdae'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
