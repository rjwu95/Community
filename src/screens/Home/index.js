import * as React from "react";
import { View, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

const Home = () => (
  <View>
    <Text>
      im Home
    </Text>
  </View>
)

export default createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: '홈',
    }),
  }
})