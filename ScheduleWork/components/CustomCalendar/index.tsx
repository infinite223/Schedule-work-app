import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { DateWithUsers, User } from '../../utils/types'
import { firstDayOfMonth } from '../../utils/scheduleFunctions'
import Day from './day'
import { Ionicons } from '@expo/vector-icons'
import { getScheduleForMonth } from '../../services/group'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import { monthNames, shortDayNames } from '../../utils/data'
import { colors } from '../../utils/globalStyles'
import { addMonthsToDate, formatDateToString } from '../../utils/functions'
import { useSelector } from 'react-redux'
import { selectInvokeFunction, selectSelectedGroupId } from '../../slices/invokeFunction'

const widthScreen = Dimensions.get('window').width
const widthDay = (widthScreen - 20) /7

interface CustomCalendarProps { 
    selectedDate: DateWithUsers, 
    setSelectedDate: (value: DateWithUsers) => void, 
}
const nowDate = new Date()
const nowYear = nowDate.getFullYear()
const nowMonth = nowDate.getMonth()

const CustomCalendar:FC<CustomCalendarProps> = ({ selectedDate, setSelectedDate }) => {

    const [days, setDays] = useState<{id: number, date: Date, users: [], noDay: boolean}[]>([])
    const invokeFunction = useSelector(selectInvokeFunction)
    const [selectedMonth, setSelectedMonth] = useState(new Date(nowYear, nowMonth, 1))
    const selectedGroupId = useSelector(selectSelectedGroupId)

    useEffect(() => {
        const tryGetScheduleForMonth = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            // const groupId = '1'

            const year = selectedMonth.getFullYear()
            const month = selectedMonth.getMonth()
            const startDate = new Date(year, month, 1)
            const endDate = new Date(year, month+1, 1)
    
            if(jsonValue != null){
                const res = await getScheduleForMonth(
                    JSON.parse(jsonValue).authToken,
                    formatDateToString(startDate),
                    formatDateToString(endDate),
                    selectedGroupId)
        
                if(res.status === 200) {
                    const groupData = await res.json()
                    setDays(firstDayOfMonth(selectedMonth, groupData))
                }

                else {
                    router.push('/messageModal')
                    router.setParams({ message: "Nie udało się pobrać grafiku", type: 'ERROR' })
                }
            }
        }
        
        tryGetScheduleForMonth()

    }, [invokeFunction, selectedMonth, selectedGroupId]) 

  return (
    <View style={styles.conatiner}> 
        <View style={styles.navigation}>
            <TouchableOpacity 
                style={{padding: 5}}
                onPress={() => setSelectedMonth(addMonthsToDate(selectedMonth, -1))}
            >
                <Ionicons name='arrow-back-outline' size={22} color={colors.baseColor}/>
            </TouchableOpacity>
            <Text>
                {monthNames[selectedMonth.getMonth()]}
                {' ' + selectedMonth.getFullYear()}
            </Text>
            <TouchableOpacity  
                style={{padding: 5}}
                onPress={() => setSelectedMonth(addMonthsToDate(selectedMonth, 1))}
            >
                <Ionicons name='arrow-forward-outline' size={22} color={colors.baseColor}/>
            </TouchableOpacity>
        </View>

        <FlatList
            data={shortDayNames}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ 
                height: 20,
                flexGrow: 0
            }}
            contentContainerStyle={{ 
                width: widthScreen - 20, 
                justifyContent: 'space-between',
                // backgroundColor: 'red'
            }}
            renderItem={({item, index}) => 
                <Text key={index} style={{width: widthDay, fontSize: 12, fontWeight: '300', alignItems: 'center', justifyContent:'center', textAlign: 'center'}}>
                    {item}
                </Text>
            }
        />

        <View style={styles.days}> 
            <FlatList
                data={days}
                numColumns={7}
                renderItem={({ item, index }) => {
                    const isSelected = item.date === selectedDate.date;
    
                        return (
                            <TouchableOpacity disabled={item.noDay} key={index} onPress={() => { 
                                    setSelectedDate({date: item.date, users: item.users})
                                }}>
                                <Day 
                                    id={item.id} 
                                    isSelected={isSelected}
                                    users={item.users}
                                />
                            </TouchableOpacity>
                        )
                    }
                }
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    conatiner: {
        paddingHorizontal: 10,
        alignItems:'center',
    },
    navigation: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingBottom: 25,
        width: widthScreen - 40
    },
    days: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
    },
})

export default CustomCalendar