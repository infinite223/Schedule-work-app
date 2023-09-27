import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { colors, globalStyles } from '../utils/globalStyles'
import { Link, useRouter } from 'expo-router'
import calendar from './../assets/images/calendar.png'
import logo from './../assets/images/logo.png'
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllWorkPlace } from '../services/workPlace'

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
    const router = useRouter()
    useEffect(() => {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('my-key');

                if(jsonValue != null){
                    const data = JSON.parse(jsonValue)
                    console.log(data.authToken)
                    if(!data.user.userName) {
                        router.push('/editUser')
                    }
                    else {
                        router.push('/Drawer/schedule')
                    }
                }
            } catch (e) {
                console.log(e)
            }
        };

        getData()

    }, [])

  return (
    <View style={styles.container}>
        <Image style={{width: 100, height: 100, marginBottom: 100}} source={calendar}/>

        <Image style={{width: 255, height: 70}} source={logo}/>

        <Text style={styles.descriptionText}>
            Zaloguj się do włąsnego miejsca pracy aby ułatwić sobie zarządzanie pracą.
        </Text>

        <Link href={'/login'}
            style={[styles.loginButton, globalStyles.boxShadow]}
        >
            <Text style={{color: 'white', fontWeight: '700'}}>
                Zaloguj się 
            </Text>
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'center', 
        backgroundColor:'white',
        flex: 1,
        gap: 30
    },
    header: {
        alignItems:'flex-end',
        right: 30
    },
    appText: {
        fontSize: 30, 
        fontWeight: 'bold'
    },
    descriptionText: {
        textAlign: 'center',
        marginHorizontal: 50,
        fontWeight: '300',
        fontSize: 12
    },
    workplaceName: {
        fontStyle:'italic', 
        left: 40
    },
    loginButton: {
        borderRadius: 50, 
        backgroundColor: colors.baseColor, 
        paddingHorizontal:20, 
        paddingVertical: 10
    }
})

export default HomeScreen