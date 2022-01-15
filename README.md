## Cara menambahkan firebase cloud message pada next.js

1. Buat file baru pada `public/firebase-messaging-sw.js`

```
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

```

2. Pada file `pages/index.js` tambahkan variable dan method baru

variable inisial key firebase

```
export default class App extends React.Component {
  firebaseConfig = {
    apiKey: "AIzaSyDFfiYiF_xcndlGcimvENwNZS27XuFco84",
    authDomain: "minangphotograyapp.firebaseapp.com",
    projectId: "minangphotograyapp",
    storageBucket: "minangphotograyapp.appspot.com",
    messagingSenderId: "151977759964",
    appId: "1:151977759964:web:5a2a4455f49d9fd5fa9019",
    measurementId: "G-2M1SSNTTFV",
  };

  fcmConfig = {
    vapidKey:
      "BGkGvWzImHbn8b0-GOdocVVMLIIU1KspcqUYs5Nld40kVbKzIe7jsO-hRCOXjUvvfQ_0Ttg6XKlRsvzPzkp6tmM",
  };

  ...
}

```

method inisial firebase

```

export default class App extends React.Component {
    ...

    componentDidMount = () => {
        this.firebaseCloudMessageInit();
    };

    firebaseCloudMessageInit = async () => {
        // start request permission
        const permissionStatus = await Notification.requestPermission();
        if (permissionStatus && permissionStatus == "granted") {
        // init firebase
        const firebaseApp = initializeApp(this.firebaseConfig);

        // init messaging
        const messaging = getMessaging(firebaseApp);
        const token = await getToken(messaging, this.fcmConfig);

        // show token from console log
        console.log("Firebase Cloud Messaging Client Token : \n" + token);
        // console-log-output# Firebase Cloud Messaging Client Token : dd5EOxW2Ffs26-yAnRpoKv:APA91bEzNtCbB1vQ7TNdXJtLuaHwa62GzoKZHsZhC5AqTQE32gXSufJnUxoXSNSznauo44aIJb5uYDbPGDHi-l-40RoFcc6ibmDdwaHv_ej0gGqz-GbWOqPPAnyMEjYLVtMgoHxoYrW3

        // start event on message
        onMessage(messaging, resultMessage => {
            // show data result message from console log
            console.log("Data message result \n", resultMessage);

            /**
            *console-log-output#
            *
            *{
            *    "from": "151977759964",
            *    "collapseKey": "do_not_collapse",
            *    "messageId": "120f7d49-01d1-4465-9df6-c9e1fe219577",
            *    "notification": {
            *        "title": "Breaking News",
            *        "body": "New news story available."
            *    }
            *}
            */
        });
        }
    };

    ...
}

```

3. Pakai google api untuk mengirimkan pesan

Method
```
POST
```

Header

```
Content-Type:application/json
Authorization:key=AAAAI2KUlNw:APA91bGEhnZyXXXXXXXXXX-JUPgLdn09XG7rnx2UYGVSjqq8jS2wOqYj9wEIuJgeeuXXXXXXXXXX-LE8eFnafO0JaPDvNY8EqXXXXXXXXXX-AUvOdDMog4lzr1VJLdiMxlXXXXXXXXXX



```
Body
```
{
  "registration_ids": ["dd5EOxW2Ffs26-yAnRpoKv:APA91bEzNtCbB1vQ7TNdXJtLuaHwa62GzoKZHsZhC5AqTQE32gXSufJnUxoXSNSznauo44aIJb5uYDbPGDHi-l-40RoFcc6ibmDdwaHv_ej0gGqz-GbWOqPPAnyMEjYLVtMgoHxoYrW3"],
  "notification": {
    "title": "Breaking News",
    "body": "New news story available."
  },
  "priority" : "high"
}
```

Note: registration_ids merupakan token dari client yang di dapat dari `messaging.getToken`

Response Success
```
{
    "multicast_id": 6264045903538899953,
    "success": 1,
    "failure": 0,
    "canonical_ids": 0,
    "results": [
        {
            "message_id": "8c27c403-b278-4510-b24e-1fb5342c6eba"
        }
    ]
}
```
