const admin = require("firebase-admin");
const serviceAccount = require("./push-notification-demo.json");

// initializing firebase app
admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount),
});

module.exports.handler = async (event) => {
  try {
    const token = JSON.parse(event.body).token;
    const payload = {
      notification: {
        title: "Push Notification",
        body: "This is push notification sent dynamically from backend 🤩",
        sound: "default",
      },
    };
    await admin.messaging().sendToDevice(token, payload, {
      contentAvailable: true,
      priority: "high",
    });

    return {
      statusCode: 200,
      body: "Success",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error",
    };
  }
};
