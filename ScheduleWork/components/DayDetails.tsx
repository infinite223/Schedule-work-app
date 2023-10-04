import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { colors, globalStyles } from '../utils/globalStyles'
import { Entypo } from '@expo/vector-icons'
import Loading from './Loading'
import { User } from '../utils/types'
import {  router, useNavigation, usePathname } from 'expo-router'
import { getDay } from '../services/day'
import AsyncStorage from '@react-native-async-storage/async-storage'

const widthScreen = Dimensions.get('screen').width

const DayDetails:FC<{selectedDate: string}> = ({selectedDate}) => {
    const [users, setUsers] = useState<any[] | null>(null)
    const [isMyDay, setIsMyDay] = useState(false)

    const pathname = usePathname()
    console.log(pathname)
    useEffect(() => {

        const getUsersInDay = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if(jsonValue != null) {
                const res = await getDay(JSON.parse(jsonValue).authToken, selectedDate)

                if(res.status === 200) {
                    const dayData = await res.json()
                    setUsers(dayData?.usersInDay)
                }

                if(res.status === 401) {
                    setUsers([])
                }

                setIsMyDay(users?.find((userInDay) => userInDay.user.id === JSON.parse(jsonValue).user.id))
            }
        }

        getUsersInDay()

    }, [selectedDate])
    console.log(users)
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
                    <TouchableOpacity style={[styles.userItem, globalStyles.boxShadow]}>
                        <Text style={styles.namePerson}>
                            {item.user.userName}
                        </Text>
                        <Text>
                            od: {item.from}
                        </Text>
                        <Text>
                            do: {item.to}
                        </Text>
                        <Text style={styles.fullHoursText}>
                             10h
                        </Text>
                    </TouchableOpacity>
                }
            />
            {pathname!=='/selectHoursModal'&&
                <TouchableOpacity 
                    style={[styles.plusButton, globalStyles.boxShadow]}
                    onPress={() => router.push({ pathname: "/selectHoursModal", params: { day: selectedDate } })}
                >
                    {isMyDay?
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
      borderTopWidth:1,
      padding: 10,
      alignItems:'center',
      justifyContent: 'space-between', 
    },
    dateText: {
      letterSpacing: 1,
      fontWeight: '400'
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