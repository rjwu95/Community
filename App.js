/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import * as React from 'react'
import { YellowBox } from 'react-native'
import { createAppContainer } from 'react-navigation'
import SafeAreaView from 'react-native-safe-area-view'
import { createBottomTabNavigator, createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import Board from './src/screens/Board';
import DomesticStock from './src/screens/DomesticStock';
import Estate from './src/screens/Estate';
import ForeignStock from './src/screens/ForeignStock';
import Mypage from './src/screens/Mypage';
import Home from './src/screens/Home'

// NativeModules.GetCertificateCode.getCodeForCertificateImport(value =>{
//   console.log('value is ', value)
// })

YellowBox.ignoreWarnings([
  'componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.'
])

const MyDrawerNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: '홈',
    },
  },
  Community: {
    screen: createMaterialTopTabNavigator({
      DomesticStock: {
        screen: DomesticStock,
        navigationOptions: {
          title: '국내주식'
        }
      },
      ForeignStock:  {
        screen: ForeignStock,
        navigationOptions: {
          title: '해외주식'
        }
      },
      Estate:  {
        screen: Estate,
        navigationOptions: {
          title: '부동산'
        }
      },
      Board:  {
        screen: Board,
        navigationOptions: {
          title: '자유게시판'
        }
      },
    }, {
      tabBarComponent: props => (
        <SafeAreaView>
          <MaterialTopTabBar {...props} />
        </SafeAreaView>
      )
    }),
    navigationOptions: {
      title: '커뮤니티',
    },
  },
  Mypage: {
    screen: Mypage,
    navigationOptions: {
      title: '마이페이지',
    },
  }
})

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp;
