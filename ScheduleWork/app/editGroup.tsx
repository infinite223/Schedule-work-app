import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const { groupId } = useLocalSearchParams()

  return (
    <View>
      <Text>Edit group {groupId}</Text>
    </View>
  )
}

export default Page