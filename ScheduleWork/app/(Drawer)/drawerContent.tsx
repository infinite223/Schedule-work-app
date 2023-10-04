import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../utils/types';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import logo from './../../assets/images/logo.png'
import { useSelector } from 'react-redux';
import { selectWorkPlace } from '../../slices/workPlaceSlice';
import { colors, globalStyles } from '../../utils/globalStyles';

const DrawerContent = () => {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const workPlace = useSelector(selectWorkPlace)

    // which options need admin in left side bar?
    //  - 
    // witch options need user 
    // drow siple design on groups screen 
    // implement that design
    // implement functionals to remove user if u are logged as admin
    // 
    
    useEffect(() => {
        const getData = async () => {
            const jsonValue:any = await AsyncStorage.getItem('my-key');
            setUser(jsonValue != null ? JSON.parse(jsonValue).user : null)

            setIsAdmin(workPlace.adminId === user?.id.toString())
        }

        getData()
        
    }, [])

  return (
    <SafeAreaProvider style={[styles.container, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.push('/(Drawer)/schedule')}>
            <Image style={{width: 185, height: 50, marginBottom: 20}} source={logo}/>
        </Pressable>

        {user?.id&&<Link href={{pathname: '/(Drawer)/profile', params: {userId: user?.id}}}>
            <View style={styles.personDetails}>
                <Ionicons name='person-sharp' size={35}/> 
                <View>
                    <Text style={styles.nameText}>{user?.name}</Text>
                    <Text style={styles.userNameText}>{user?.userName}</Text>
                </View>
            </View>
        </Link>}
        <Text style={styles.headerText}>Zalogowany jako: 
            {isAdmin?' administrator':' pracownik'}
        </Text>

        <View style={styles.main}>
            <View style={{marginVertical: 20, gap: 5}}>
                {isAdmin&&
                    <TouchableOpacity 
                        onPress={() => router.push('/inviteWorkerModal')}
                        style={[styles.item, globalStyles.boxShadow]}
                    >
                        <AntDesign name="addusergroup" size={20} color={'white'}/>
                        <Text style={styles.itemText}>Zaproś pracowników</Text>
                    </TouchableOpacity>
                }

                    <TouchableOpacity onPress={() => router.push('/(Drawer)/groups')} style={styles.optionButton}>
                        <MaterialCommunityIcons name='account-group-outline' size={20}/>
                        <Text style={styles.optionText}>Pokaż grupy</Text>
                    </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => router.push('/(Drawer)/settings')}
                style={styles.optionButton}
            >
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
        paddingHorizontal: 15,
        gap: 10
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500'
    },
    item: {
        backgroundColor: colors.baseColor,
        flexDirection: 'row',
        alignItems: 'center',
        width: 240,
        padding: 10,
        paddingHorizontal: 15,
        gap: 10,
        borderRadius: 50
    },
    itemText: {
        fontSize: 13,
        color: 'white',
        fontWeight:'700'
    }
})

export default DrawerContent