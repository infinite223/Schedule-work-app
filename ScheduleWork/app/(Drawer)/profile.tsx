import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const Page = () => {
  return (
    <View style={styles.container}>

      <Ionicons name='person-sharp' size={55}/> 

      <Text>Profile</Text>
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

export default Page