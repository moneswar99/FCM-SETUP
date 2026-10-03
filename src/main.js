import "./style.css";

import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage
} from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlmlYCHkrmMuOnSg61ZCWzo990YGN1P-M",
  authDomain: "notification-c289b.firebaseapp.com",
  projectId: "notification-c289b",
  storageBucket: "notification-c289b.firebasestorage.app",
  messagingSenderId: "1082505800562",
  appId: "1:1082505800562:web:b4a2b454f979555489cbeb",
  measurementId: "G-TSSBF8RSEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Create test page
document.querySelector("#app").innerHTML = `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 700px;
    margin: 50px auto;
    padding: 30px;
  ">

    <h1>🔔 FCM Notification Test</h1>

    <p>
      Firebase Cloud Messaging test application
    </p>

    <button id="enableNotifications">
      Enable Notifications
    </button>

    <p id="status">
      Status: Waiting...
    </p>

    <textarea
      id="token"
      rows="8"
      style="width:100%;"
      placeholder="FCM device token will appear here"
      readonly
    ></textarea>

  </div>
`;

const button = document.querySelector("#enableNotifications");
const status = document.querySelector("#status");
const tokenBox = document.querySelector("#token");

// Enable notifications
button.addEventListener("click", async () => {

  try {

    status.textContent =
      "Requesting notification permission...";

    // Ask browser permission
    const permission =
      await Notification.requestPermission();

    if (permission !== "granted") {

      status.textContent =
        "❌ Notification permission denied.";

      return;
    }

    status.textContent =
      "Getting FCM device token...";

    // Generate FCM token
    const token = await getToken(messaging, {
      vapidKey: "BFrx5cX-AuakZZ8Y_N7QwElaVO-V-RT-rrNZkJ8lPdNnpwY6uSp7gH2vpB78lDgTrpfBGO29FO1Ytg-wa0UHL9k"
    });

    if (token) {

      console.log("FCM Token:", token);

      tokenBox.value = token;

      status.textContent =
        "✅ FCM is working! Device token generated.";

    } else {

      status.textContent =
        "❌ FCM token was not generated.";

    }

  } catch (error) {

    console.error("FCM Error:", error);

    status.textContent =
      "❌ Error: " + error.message;
  }
});

// Receive foreground messages
onMessage(messaging, (payload) => {

  console.log(
    "Foreground notification received:",
    payload
  );

  const title =
    payload.notification?.title ||
    "New Notification";

  const body =
    payload.notification?.body ||
    "You received a new notification.";

  alert(`${title}\n\n${body}`);
});