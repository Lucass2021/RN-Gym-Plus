import logo from "@/assets/images/logo.png";
import TextComponent from "@/components/TextComponent";
import {useAuthActions} from "@/store/auth";
import {useEffect, useState} from "react";
import {Image, View} from "react-native";
import appJson from "../app.json";
import LottieView from "lottie-react-native";
import ScrollLine from "@/assets/lottie/scroll line animation.json";

export default function SplashScreen() {
  const {setSplashScreenVisible} = useAuthActions();
  const appVersion = appJson.expo.version;
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (progress < 1) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.1;
          return newProgress >= 1 ? 1 : newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setFinished(true);
    }
  }, [progress]);

  useEffect(() => {
    if (finished) {
      setTimeout(() => {
        handleAnimationFinish();
      }, 100);
    }
  }, [finished]);

  const handleAnimationFinish = () => {
    setSplashScreenVisible(false);
  };

  return (
    <View className="flex-1 items-center justify-between bg-primaryDark py-10">
      <View className="w-full pb-11.5" />
      <View className="items-center">
        <View className="mb-10">
          <Image source={logo} className="w-72 h-72" />
        </View>

        <LottieView
          source={ScrollLine}
          autoPlay
          loop
          style={{width: 200, height: 200}}
          progress={progress}
        />
      </View>
      <View className="items-center w-full pb-11.5">
        <TextComponent
          fontFamily="Inter"
          fontWeight="Bold"
          color="light"
          fontSize="paragraphOne">
          Versão {appVersion}
        </TextComponent>
      </View>
    </View>
  );
}
