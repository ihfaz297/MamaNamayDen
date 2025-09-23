// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import RouteDetailScreen from "./screens/RouteDetailScreen";

export type RouteItem = {
  id: string;
  name: string;
  stops: string[];
  firstBus: string;
  lastBus: string;
  freqMins: number;
};

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  RouteDetail: { routeData: RouteItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true, title: "Mama Namay Den" }} />
        <Stack.Screen name="RouteDetail" component={RouteDetailScreen} options={{ title: "Route Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
