import { GameProvider } from "@/context/gameContext"; // make sure this path is correct
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <StatusBar style="light" />
        <Stack>
          {/*Home screen - hides header */}
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          />

          {/* Game screen - shows blue header with back button */}
          <Stack.Screen
            name="game"
            options={{
              title: "KibbyCode",
              headerStyle: { backgroundColor: "#dbc5e1" },
              headerTintColor: "#4b1cb8",
              headerTitleAlign: "left",
            }}
          />

          {/* Question screen */}
          <Stack.Screen
            name="questionScreen"
            options={{ title: "Coding Challenge" }}
          />
        </Stack>
      </GameProvider>
    </GestureHandlerRootView>
  );
}