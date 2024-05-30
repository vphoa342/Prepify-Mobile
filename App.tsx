import React from "react";
<<<<<<< HEAD
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import About from "src/screens/About";
import Home from "src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "src/screens/Login";
=======
import { AuthProvider } from "src/contexts/auth/AuthContext";
import { AppNavigation } from "src/navigation/AppNavigation";
>>>>>>> feature/PREP-46

const Tab = createBottomTabNavigator();
export default function App() {
<<<<<<< HEAD
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
=======
    return (
        <AuthProvider>
            <AppNavigation />
        </AuthProvider>
    );
>>>>>>> feature/PREP-46
}
