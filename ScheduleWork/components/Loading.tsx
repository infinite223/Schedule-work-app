import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1, 
      alignItems: 'center',
      justifyContent: 'center' 
    }
  })

export default Loading