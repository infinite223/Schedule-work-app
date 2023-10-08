import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { colors, globalStyles } from '../utils/globalStyles'
import { Entypo } from '@expo/vector-icons'
import Loading from './Loading'
import { User } from '../utils/types'
import {  Link, router, useNavigation, usePathname } from 'expo-router'
import { getDay } from '../services/day'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { removeUserInDay } from '../services/userInDay'
import { useDispatch, useSelector } from 'react-redux'
import { selectInvokeFunction, setInvokeFunction } from '../slices/invokeFunction'
import { timeCounter } from '../utils/timeCounter'

const widthScreen = Dimensions.get('screen').width

const DayDetails:FC<{selectedDate: string}> = ({selectedDate}) => {
    const [users, setUsers] = useState<any[] | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const invokeFunction = useSelector(selectInvokeFunction)

    const [isMyDay, setIsMyDay] = useState(false)
    const pathname = usePathname()
    const dispatch = useDispatch()

    const removeUser = async () => {
        const jsonValue = await AsyncStorage.getItem('my-key');
        
            if(jsonValue != null && users) {
                const findMe = users?.find((userInDay) => userInDay.user.id === JSON.parse(jsonValue).user.id)
                console.log(findMe)
                if(findMe){
                    const res = await removeUserInDay(JSON.parse(jsonValue).authToken, findMe.id)

                    dispatch(setInvokeFunction(!invokeFunction))
                }
            }
    }

    useEffect(() => {
        const getUsersInDay = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if(jsonValue != null) {
                setUser(JSON.parse(jsonValue).user)
                const res = await getDay(JSON.parse(jsonValue).authToken, selectedDate)

                if(res.status === 200) {
                    const dayData = await res.json()
                    setUsers(dayData?.usersInDay)
                }

                if(res.status === 401) {
                    setUsers([])
                }
            }
        }

        getUsersInDay()

    }, [selectedDate, invokeFunction])

    useEffect(() => {
        const getUser = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if(jsonValue != null) {
                const findMe = users?.find((userInDay) => userInDay.user.id === JSON.parse(jsonValue).user.id)
            
                if(findMe) {
                    setIsMyDay(true)
                }
                else {
                    setIsMyDay(false)
                }
            }
        }

        getUser()
    }, [selectedDate, users])

    
    if(!users) {
        return (
            <Loading/>
          )
    }

    return (
        <View style={styles.dayContainer}>
            <Text style={styles.dateText}>{selectedDate.toString()}</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => 
                    <Link
                        href={{pathname: '/(Drawer)/profile', params: {userId: item?.user.id}}}
                        asChild
                        style={[
                            styles.userItem, globalStyles.boxShadow_light, 
                        ]}
                    >
                        <TouchableOpacity
                        >
                            <Text style={[styles.namePerson, {color: item.user.id===user?.id?colors.baseColor: 'black'}]}>
                                {item.user.userName}
                            </Text>
                            <Text>
                                od: {item.from}
                            </Text>
                            <Text>
                                do: {item.to}
                            </Text>
                            <Text style={styles.fullHoursText}>
                                {timeCounter(item.from, item.to).godziny}h {timeCounter(item.from, item.to).minuty}m
                            </Text>
                        </TouchableOpacity>
                    </Link>
                }
            />
            
            {pathname!=='/selectHoursModal'&&
                <TouchableOpacity 
                    style={[styles.plusButton, globalStyles.boxShadow]}
                    onPress={() => { 
                        if(!isMyDay){
                            router.push({ pathname: "/selectHoursModal", params: { day: selectedDate } })
                        }
                        else {
                            removeUser()
                        }
                    }}
                >
                    {!isMyDay?
                        <Entypo name="plus" size={25} color={'white'}/>:
                        <Entypo name="minus" size={25} color={'white'}/>
                    }
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    dayContainer: {
      flex: 1,
      width: '100%',
      borderTopColor: '#ddd',
      borderTopWidth:0,
      padding: 10,
      alignItems:'center',
      justifyContent: 'space-between', 
    },
    dateText: {
      letterSpacing: 1,
      fontWeight: '400',
      fontSize: 12  
    },
    plusButton: {
      borderRadius: 50,
      backgroundColor: colors.baseColor,
      alignItems:'center',
      justifyContent: 'center',
      padding: 15,
      margin:20
    },
    userItem: {
        backgroundColor:'white',
        flexDirection:'row',
        padding: 10,
        borderRadius: 5,
        width: widthScreen - 20,
        flex:1,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',  
    },
    namePerson: {
        fontWeight: '700'
    },
    fullHoursText: {
        fontWeight: '300',
        fontSize: 11
    }
  })

export default DayDetails