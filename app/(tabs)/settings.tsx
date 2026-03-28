import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const setting = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View>
        <Text>setting</Text>
      </View>
    </SafeAreaView>
  );
};

export default setting;
