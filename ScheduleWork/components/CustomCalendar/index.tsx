import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { User } from '../../utils/types'
import { firstDayOfMonth } from '../../utils/scheduleFunctions'
import Day from './day'
import { Ionicons } from '@expo/vector-icons'
import { getScheduleForMonth } from '../../services/group'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

type DateWithUsers = {
    date: string, 
    users: User[]
}

interface CustomCalendarProps { 
    selectedDate: DateWithUsers, 
    setSelectedDate: (value: DateWithUsers) => void, 
}

const CustomCalendar:FC<CustomCalendarProps> = ({ selectedDate }) => {
    const days = firstDayOfMonth(new Date(selectedDate.date))
    const selectedMonth = new Date(selectedDate.date).getMonth()
    
    useEffect(() => {
        const tryGetScheduleForMonth = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            const groupId = ''

            if(jsonValue != null){
                const res = await getScheduleForMonth(
                    JSON.parse(jsonValue).authToken,
                    selectedDate.date,
                    groupId)
                if(res.status === 200) {
                    console.log(res.json())
                }

                else {
                    router.push('/messageModal')
                    router.setParams({ message: "Nie udało się pobrać grafiku", type: 'ERROR' })
                }
            }
        }

        tryGetScheduleForMonth()

    }, []) 

  return (
    <View style={styles.conatiner}> 
        <View style={styles.navigation}>
            <TouchableOpacity onPress={() => {}}>
                <Ionicons name='arrow-back-outline' size={22}/>
            </TouchableOpacity>
            <Text>{selectedMonth}</Text>
            <TouchableOpacity onPress={() => {}}>
                <Ionicons name='arrow-forward-outline' size={22}/>
            </TouchableOpacity>
        </View>

        <View style={styles.days}> 
            {days.map((day) => {
                const isSelected = day === new Date(selectedDate.date).getDay();

                return (
                    <TouchableOpacity onPress={() => {}}>
                        <Day id={day} isSelected={isSelected}/>
                    </TouchableOpacity>
                )
                }
            )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner: {
        paddingHorizontal: 10
    },
    navigation: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    days: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default CustomCalendar