import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { FC, useState, useEffect } from 'react'
import { colors } from '../utils/globalStyles'
import { Entypo } from '@expo/vector-icons'
import Loading from './Loading'
import { User } from '../utils/types'
import {  router, useNavigation, usePathname } from 'expo-router'

const widthScreen = Dimensions.get('screen').width

const DayDetails:FC<{selectedDate: string}> = ({selectedDate}) => {
    const [users, setUsers] = useState<User[] | null>(null)
    const pathname = usePathname()
    console.log(pathname)
    useEffect(() => {
        const getUsersInDay = () => {
            setUsers([{email: '',name: 'Mateusz', groupId: '', id: '', userName: 'Mati21', workPlaceId: ''}])
        }

        getUsersInDay()

    }, [selectedDate])

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
                    <TouchableOpacity style={styles.userItem}>
                        <Text>
                            {item.userName}
                        </Text>
                    </TouchableOpacity>
                }
            />
            {pathname!=='/selectHoursModal'&&<TouchableOpacity 
                style={styles.plusButton}
                onPress={() => router.push({ pathname: "/selectHoursModal", params: { day: selectedDate } })}
            >
                <Entypo name="plus" size={30} color={'white'}/>
            </TouchableOpacity>}
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
      borderRadius: 10,
      backgroundColor: colors.baseColor,
      alignItems:'center',
      justifyContent: 'center',
      padding: 10,
      margin:20
    },
    userItem: {
        flexDirection:'row',
        padding: 10,
        borderRadius: 5,
        width: widthScreen - 40,
        flex:1,
        marginVertical: 10    
    }
  })

export default DayDetails