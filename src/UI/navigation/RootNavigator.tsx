import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FilterScreen, HomeScreen } from "../screens";
import { Colors } from "../constants/Colors";
import { ToastProvider } from "../../lib/core";

import { RootRoutes, RootStackParamList } from "./types";
import type { ToastType } from "../../lib/core";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const [toast, setToast] = useState<ToastType | undefined>(undefined);
  return (
    <SafeAreaProvider>
      <ToastProvider toastValue={{ toast, setToast }}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Screen name={RootRoutes.HOME} component={HomeScreen} />
            <RootStack.Screen
              name={RootRoutes.FILTERS}
              component={FilterScreen}
              options={{
                // presentation: "modal",
                headerShown: true,
                headerTransparent: true,
                headerBlurEffect: "systemChromeMaterialDark",
                headerTintColor: Colors.text,
                headerStyle: { backgroundColor: Colors.dark },
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
};
