import * as React from "react";
import { View, Text } from 'react-native'
import { PostList } from "../../components";
import { createStackNavigator } from 'react-navigation-stack'

const Estate = () => (
  <PostList postList={[
      { id: 1, user: '유건', title: '나 돈 많아', createdAt: '2019-09-06' },
      { id: 2, user: '김또깡', title: '돈벌고 싶어', createdAt: '2019-09-06' },
      { id: 3, user: '나도야', title: '1억 기부', createdAt: '2019-09-06' }
    ]}
    totalPage={5}
  />
)

export default Estate