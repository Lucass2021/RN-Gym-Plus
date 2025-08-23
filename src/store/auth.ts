import AsyncStorage from "@react-native-async-storage/async-storage";
import {create} from "zustand";
import {combine, createJSONStorage, persist} from "zustand/middleware";

const authStore = create(
  persist(
    combine(
      {
        isLoggedIn: false,
        isFirstAccess: true,
        isSplashScreenVisible: true,
      },
      set => ({
        actions: {
          login: () => set({isLoggedIn: true}),
          logout: () => set({isLoggedIn: false}),
          setFirstAccess: (firstAcessValue: boolean) =>
            set({isFirstAccess: firstAcessValue}),
          setSplashScreenVisible: (splashScreenVisible: boolean) =>
            set({isSplashScreenVisible: splashScreenVisible}),
          resetSplashScreen: () => set({isSplashScreenVisible: true}),
        },
      }),
    ),
    {
      name: "@GYM-PLUS-User",
      storage: createJSONStorage(() => AsyncStorage),
      // eslint-disable-next-line no-unused-vars
      partialize: ({actions, ...rest}) => rest,
    },
  ),
);

export const useAuthActions = () => authStore(state => state.actions);

export const useIsLoggedIn = () => authStore(state => state.isLoggedIn);
export const useisFirstAccess = () => authStore(state => state.isFirstAccess);

export const useIsSplashScreenVisible = () =>
  authStore(state => state.isSplashScreenVisible);
