import { ColorSchemas } from "@/constants/colors";
import BookingScreen from "@/screens/BookingScreen";
import HomeScreen from "@/screens/HomeScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator();

type BottomNavProps = {};

const BottomNav: React.FC<BottomNavProps> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 2 },
        tabBarStyle: {
          borderColor: "white",
        },
        tabBarActiveTintColor: ColorSchemas.blue,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon({ color, focused, size }) {
            if (focused) return <Entypo name="home" size={24} color={color} />;
            return <AntDesign name="home" size={24} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarLabel: "Booking",
          tabBarIcon({ color, focused, size }) {
            if (focused)
              return <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />;
            return <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon({ color, focused, size }) {
            if (focused) return <Ionicons name="person-circle" size={24} color={color} />;
            return <Ionicons name="person-circle-outline" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
