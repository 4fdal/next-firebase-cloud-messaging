importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDFfiYiF_xcndlGcimvENwNZS27XuFco84",
  authDomain: "minangphotograyapp.firebaseapp.com",
  projectId: "minangphotograyapp",
  storageBucket: "minangphotograyapp.appspot.com",
  messagingSenderId: "151977759964",
  appId: "1:151977759964:web:5a2a4455f49d9fd5fa9019",
  measurementId: "G-2M1SSNTTFV",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
