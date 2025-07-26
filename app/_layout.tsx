import {BebasNeue_400Regular} from "@expo-google-fonts/bebas-neue";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";

import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "react-native";
import "react-native-reanimated";
import {SafeAreaProvider} from "react-native-safe-area-context";
import "../src/global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    BebasNeue_400Regular,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return fontsLoaded ? (
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  ) : null;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const isLoggedIn = false;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="(app)"
          redirect={!isLoggedIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="auth"
          redirect={isLoggedIn}
          options={{headerShown: false}}
        />
      </Stack>
    </ThemeProvider>
  );
}
