import TextComponent from "@/components/TextComponent";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handleFirstAccess = () => {};

  return (
    <View className="flex-1 justify-around items-center bg-white px-10 pt-10">
      <View>
        <TextComponent
          color="gray"
          fontFamily="BebasNeue"
          fontWeight="Regular"
          fontSize="h4"
          customClassName="text-center"
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </TextComponent>
      </View>
      {/* <View>
        <Ilustration className="w-96 h-96" />
      </View> */}
      <View>
        <TextComponent
          color="gray"
          fontFamily="Inter"
          fontWeight="Regular"
          fontSize="paragraphOne"
          customClassName="text-center"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum,
          beatae laudantium. Unde velit dicta tempora dolorem dolor, magni qui
          nesciunt.
        </TextComponent>
      </View>
      <TouchableOpacity
        onPress={() => handleFirstAccess()}
        className="bg-accent rounded-xl w-14 h-14 flex justify-center items-center"
      >
        {/* <AntDesign name="right" size={24} color="white" /> */}
      </TouchableOpacity>
    </View>
  );
}
