importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDlmlYCHkrmMuOnSg61ZCWzo990YGN1P-M",
  authDomain: "notification-c289b.firebaseapp.com",
  projectId: "notification-c289b",
  storageBucket: "notification-c289b.firebasestorage.app",
  messagingSenderId: "1082505800562",
  appId: "1:1082505800562:web:b4a2b454f979555489cbeb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Background message:",
    payload
  );

  const title =
    payload.notification?.title || "🚨 New Alert";

  const options = {
    body:
      payload.notification?.body ||
      "You have received a new alert."
  };

  self.registration.showNotification(
    title,
    options
  );
});