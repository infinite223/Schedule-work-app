import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserInDay } from '../../utils/types'
import { getAllUsersInDay, removeUserInDay } from '../../services/userInDay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import { colors, globalStyles } from '../../utils/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { usePathname } from 'expo-router/src/hooks'
import { Link, router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectInvokeFunction, setInvokeFunction } from '../../slices/invokeFunction'
import { StatusBar } from 'expo-status-bar'
import { formatStringToDate } from '../../utils/functions'
import { monthNames, shortDayNames } from '../../utils/data'
const widthScreen = Dimensions.get('screen').width

const Page = () => {
    const [userInDays, setUserInDays] = useState<UserInDay[]>([])
    const pathname = usePathname()
    const dispatch = useDispatch()
    const invokeFunction = useSelector(selectInvokeFunction)

    useEffect(() => {
        const getData = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if(jsonValue != null) {          
                const allUsersInDay = await getAllUsersInDay(JSON.parse(jsonValue).authToken)
                if(allUsersInDay.status === 200) {
                    setUserInDays(await allUsersInDay.json())
                }
            }
        }
        
        if(pathname === '/timelineWork'){
            getData()
        }

    }, [pathname])

    const removeUser = async (id: string) => {
        const jsonValue = await AsyncStorage.getItem('my-key');
        
            if(jsonValue != null ) {
                if(id){
                    const res = await removeUserInDay(JSON.parse(jsonValue).authToken, id)
                    if(res.status) {
                        setUserInDays(userInDays.filter((userIdDay) => userIdDay.id !== id))
                        dispatch(setInvokeFunction(!invokeFunction))
                    }
                }
            }
    }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <FlatList
        data={userInDays}
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, gap: 7}}
        renderItem={({ item }) => 
            <View 
                style={[styles.userInDay, globalStyles.boxShadow_light]}
            >
                <View style={{flexDirection:'row', alignItems: 'center', gap: 20}}>
                    {item.day&&
                        <View style={styles.dateContainer}>
                            <View style={styles.mainDate}>
                                <Text style={styles.numberDay}>
                                    {formatStringToDate(item.day?.date.toString()).getDate()+' '}
                                </Text>
                                <Text>
                                    {shortDayNames[formatStringToDate(item.day?.date.toString()).getDay() - 1]}
                                </Text>
                            </View>
                            <Text style={styles.monthName}>
                                {monthNames[formatStringToDate(item.day?.date.toString()).getMonth()]}
                            </Text>
                        </View>
                    }
                    <View style={{flexDirection: 'row', alignItems:'center', gap: 5 }}>
                        <Text style={styles.text}>od {item.from} </Text>
                        <Text style={styles.text}>- </Text>
                        <Text style={styles.text}>do {item.to}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => removeUser(item.id)}
                    style={{paddingLeft: 10}}
                >
                    <Ionicons name='ios-trash-outline' size={24}/>
                </TouchableOpacity>
            </View>
        }
      />

        <TouchableOpacity 
            activeOpacity={.7} 
            style={styles.footer}
            onPress={() => router.push('/countHoursModal')}
        >
            <Text style={styles.footerText}>
                Przewidywanie miesiąca 
            </Text>
            
            <Ionicons name="md-arrow-forward-circle-outline" size={20} color='#555' />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 10,
    },
    userInDay: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 8,
        gap: 15
    },
    dateContainer: {
        
    },
    mainDate: {
        flexDirection:'row',
        alignItems:'center'
    },
    numberDay: {
        fontSize: 18,
        fontWeight: '900'
    },
    nameDay: {
        fontSize: 15,

    },
    monthName: {
        fontWeight: '400',
        fontSize: 10    
    },
    text: {
        fontSize: 13
    },
    footer: {
        backgroundColor: '#ddd',
        height: 45,
        marginHorizontal: 10,
        marginVertical: 15,
        marginBottom: Platform.OS ==='ios'?25: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        gap: 20
    },
    footerText: {
        // color: 'white',
        color: '#555',
        fontWeight: '600',
        fontSize: 13
    }
})

export default Page