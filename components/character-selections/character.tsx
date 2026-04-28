import { Image, ImageSourcePropType, Text, View } from "react-native";

interface Props {
  name: string;
  image: ImageSourcePropType;
}

export default function Character({ name, image }: Props) {
  return (
    <View className="bg-amber-400 p-4 rounded-xl">
      <Image
        source={image}
        style={styles.characterImage}
        className="rounded-xl"
      />
      <Text
        className="text-lg font-bold text-gray-900 text-center"
        selectionColorClassName="accent-blue-500"
      >
        {name}
      </Text>
    </View>
  );
}

const styles = {
  characterImage: {
    width: 150,
    height: 250,
  },
};
