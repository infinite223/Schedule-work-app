import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import React from 'react'
import { globalStyles } from '../utils/globalStyles'
import { useLocalSearchParams } from 'expo-router'

const widthScreen = Dimensions.get('screen').width

const Page = () => {
  const params = useLocalSearchParams();
  console.log(params)

  return (
    <View style={[styles.container]}>
      <View style={[styles.content, globalStyles.boxShadow]}>
        <Text style={styles.dateText}>{params.day}</Text>
        <Text style={styles.headerText}>Wybierz godziny pracy</Text>

        <TextInput placeholder='213'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1, 
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgba(1, 1, 1, .1)',
        width: widthScreen,
        height:'100%'
    },
    content: {
      width: widthScreen - 40,
      borderRadius: 10,
      height: 400,
      backgroundColor:'white',
      padding: 10,
      marginTop: -100,
    },
    headerText: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 17,
      marginTop: 2
    },
    dateText: {
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 12
    }
})

export default Page