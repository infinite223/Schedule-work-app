import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../utils/types';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import logo from './../../assets/images/logo.png'

const DrawerContent = () => {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<User | null>(null)
    
    useEffect(() => {
        const getData = async () => {
            const jsonValue:any = await AsyncStorage.getItem('my-key');
            setUser(jsonValue != null ? JSON.parse(jsonValue).user : null)
        }

        getData()
        
    }, [])

  return (
    <SafeAreaProvider style={[styles.container, { paddingTop: insets.top }]}>
        <Image style={{width: 185, height: 50, marginBottom: 20}} source={logo}/>

        <Link href={'/(Drawer)/profile'}>
            <View style={styles.personDetails}>
                <Ionicons name='person-sharp' size={35}/> 
                <View>
                    <Text style={styles.nameText}>{user?.name}</Text>
                    <Text style={styles.userNameText}>{user?.userName}</Text>
                </View>
            </View>
        </Link>
        <Text style={styles.headerText}>Zalogowany jako: pracownik</Text>

        <View style={styles.main}>
            <View>

            </View>

            <TouchableOpacity style={styles.optionButton}>
                <Ionicons name='settings-outline' size={25}/> 
                <Text style={styles.optionText}>Ustawienia</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      marginVertical: 20,
    },
    headerText: {
        width: 240,
        paddingHorizontal: 10,
        fontSize: 9,
        fontWeight: '400'
    },
    nameText: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    userNameText: {
        fontWeight: '400',
        fontSize: 12,
    },
    personDetails: {
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 240,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    main: {
        flex: 1,
        justifyContent: 'space-between'
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 240,
        padding: 10,
        gap: 10
    },
    optionText: {
        fontSize: 15,
        fontWeight: '600'
    }
})

export default DrawerContent