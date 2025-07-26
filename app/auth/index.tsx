import TextComponent from "@/components/TextComponent";
import {Image, TouchableOpacity, View} from "react-native";
import backgroundImage from "@/assets/images/background-auth.jpg";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  const handleFirstAccess = () => {
    console.log("First acess");
  };

  return (
    <View className="flex-1 items-center bg-white pt-10">
      <View className="absolute h-full w-full bg-slate-950 opacity-50 z-10" />
      <Image source={backgroundImage} className="absolute h-full w-full" />

      <View className="flex-1 items-center justify-end pb-20 z-20">
        <TextComponent
          color="light"
          fontFamily="BebasNeue"
          fontWeight="Regular"
          fontSize="h3"
          customClassName="text-center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </TextComponent>

        <TouchableOpacity
          onPress={() => handleFirstAccess()}
          className="bg-secondary rounded-xl w-14 h-14 flex justify-center items-center mt-5">
          <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
