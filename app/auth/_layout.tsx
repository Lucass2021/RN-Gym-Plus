import {useisFirstAccess} from "@/store/auth";
import {Stack} from "expo-router";

export default function AuthLayout() {
  const isFirstAccess = useisFirstAccess();

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="index"
        redirect={isFirstAccess}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="sign-in"
        redirect={!isFirstAccess}
        options={{headerShown: false}}
      />
    </Stack>
  );
}
