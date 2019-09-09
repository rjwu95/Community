import * as React from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'

export const PostList = ({ postList, totalPage }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex:5 }}>
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <Text>공지</Text>
        </View>
        <View style={{ flex: 5, backgroundColor: 'blue', paddingHorizontal: 5 }}>
          <FlatList
            data={postList}
            renderItem={({item}) => (
              <View style={{flex:1, borderBottomWidth: 0.5, padding: 10}}>
                <TouchableOpacity>
                  <Text>작성자: {item.user}</Text>
                  <Text>제목: {item.title}</Text>
                  <Text>작성일: {item.createdAt}</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
      </View>
      <View style={{ flex:2, backgroundColor: 'yellow' }}>
        <Text style={{flex:3}}>
          검색어
        </Text>
        <View style={{flex:1}}>
          <FlatList
            data={[...Array(totalPage).keys()].map(el => el + 1)}
            renderItem={({item}) => (
                <TouchableOpacity>
                  <Text style={{flex:1}}>{item} |</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => String(item)}
            contentContainerStyle={{ backgroundColor: 'brown', flex: 1, justifyContent: 'center' }}
            horizontal={true}
          />  
        </View>
        <Text style={{flex:3}}>
          쓰기
        </Text>
      </View>
    </View>
  )
}
