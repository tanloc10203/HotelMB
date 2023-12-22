import usePushNotifications from "@/hooks/usePushNotifications";
import { socket } from "@/services/socket";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default function PushNotification() {
  const { expoPushToken, notification } = usePushNotifications();

  console.log("====================================");
  console.log(`expoPushToken`, expoPushToken?.data);
  console.log("====================================");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`socket connected`);
    });

    if (expoPushToken?.data) {
      socket.emit("pushNotification", expoPushToken.data);
    }

    socket.on("connect_error", (err) => {
      console.log(err.message);
    });
  }, [socket, expoPushToken]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
      <Text>Your expo push token: {expoPushToken?.data!}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken?.data!);
        }}
      />
    </View>
  );
}
