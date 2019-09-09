import * as React from "react";
import { View, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

const Mypage = () => (
  <View>
    <Text>
      im Mypage
    </Text>
  </View>
)

export default createStackNavigator({
  Mypage: {
    screen: Mypage,
    navigationOptions: ({ navigation }) => ({
      title: '마이페이지'
    }),
  }
})