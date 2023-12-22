import { useAuth } from "@/features/auth";
import LoginScreen from "@/screens/LoginScreen";
import OtpScreen from "@/screens/OtpScreen";
import RegisterScreen from "@/screens/RegisterScreen";
import UpdateProfileScreen from "@/screens/UpdateProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const AuthStack: React.FC = () => {
  const { apiKey, userId, status, phoneNumber } = useAuth();

  if (status === "verified") {
    return (
      <Stack.Navigator>
        <Stack.Screen
          component={UpdateProfileScreen}
          initialParams={{ userId }}
          name="UpdateProfile"
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack.Navigator>
    );
  }

  if (status === "verify" && phoneNumber) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          component={OtpScreen}
          name="Otp"
          initialParams={{ apiKey, userId, phoneNumber: phoneNumber }}
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        component={RegisterScreen}
        name="Register"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
