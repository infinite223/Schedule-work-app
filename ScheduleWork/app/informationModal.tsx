import { Text, View, Pressable, StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import React from 'react'
import { globalStyles } from '../utils/globalStyles'
import { router } from 'expo-router'
import logo from './../assets/images/logo.png'

const widthScreen = Dimensions.get('screen').width
const infoElements = [
    {
        name: 'Aktualna wersja',
        content: '1.0.1'
    },
    {
        name: "Cel aplikacji",
        content: "ScheduleWork ma ułatwić pracownikom jak i szefowi zarządzanie harmonogramem pracy tak aby każdy mógł w dowolnym momencie ustawić swoją chęć do pracy w danym dniu. I mieć stały wgląd w grafik w dowolnym mijscu na ziemi."
    },
    {
        name: "Nowości w aplikacji",
        content: "..."
    },
    {
        name: "Zgłaszaj błędy w aplikacji",
        content: "dawidszmigiel9@gmail.com"
    },
    {
        name: 'Autor aplikacji',
        content: "Dawid Szmigiel"
    },
]
const Page = () => {    

  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable onPress={() => {}} style={[styles.content, globalStyles.boxShadow_light]}>
        <Image style={{width: 200, height: 40, marginTop: 20}} source={logo}/>

        <Text style={styles.appVersion}>Schedule work v1.0.1</Text>
        <FlatList
            data={infoElements}
            renderItem={({item}) =>  
                <View style={[styles.infoItem, globalStyles.boxShadow]}>
                    <Text style={styles.name}>
                        {item.name}
                    </Text>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
            }
        />
      </Pressable>
    </Pressable>
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
    infoItem: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 6,
        backgroundColor: 'white'
    },
    name: {
        fontWeight: '300',
        width: 100,
        fontSize: 12
    },
    contentText: {
        width: widthScreen - 165
    },
    content: {
      width: widthScreen - 20,
      borderRadius: 10,
      backgroundColor:'white',
      padding: 10,
      paddingVertical: 15,
      flex: 1,
      marginTop: 150,
      alignItems: 'center',
      gap: 10
    },
    appVersion: {
        fontWeight: '400',
        fontSize: 10,
        alignSelf:'center',
        paddingVertical: 5
      }
})

export default Page