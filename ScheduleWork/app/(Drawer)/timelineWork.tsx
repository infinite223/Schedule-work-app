import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserInDay } from '../../utils/types'
import { getAllUsersInDay } from '../../services/userInDay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import { colors, globalStyles } from '../../utils/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { usePathname } from 'expo-router/src/hooks'
const widthScreen = Dimensions.get('screen').width

const userInDays: UserInDay[] = [
    {
        dayId: '', from: '', to: '', id: '', userId: '1', user: {
            id: '',
            name: 'string', 
            userName: 'string',
            email: 'string',
            phoneNumber: 1,
            workPlaceId:'',
            groupId:  ''
        },
    }
]


const Page = () => {
    const [userInDays, setUserInDays] = useState<UserInDay[]>([])
    const pathname = usePathname()

    useEffect(() => {
        const getData = async () => {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if(jsonValue != null) {          
                const allUsersInDay = await getAllUsersInDay(JSON.parse(jsonValue).authToken)
                console.log(allUsersInDay.status, 'allusersInDay')
                if(allUsersInDay.status === 200) {
                    setUserInDays(await allUsersInDay.json())
                }
            }
        }
        console.log(pathname)
        if(pathname === '/timelineWork'){
            getData()
        }

    }, [pathname])

  return (
    <View style={styles.container}>
      <FlatList
        data={userInDays}
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, gap: 7}}
        renderItem={({ item }) => 
            <View style={[styles.userInDay, globalStyles.boxShadow_light]}>
                <Text>{item.day?.date}</Text>
                <Text>od {item.from}</Text>
                <Text>do {item.to}</Text>
            </View>
        }
      />

        <TouchableOpacity activeOpacity={.7} style={styles.footer}>
            <Text style={styles.footerText}>
                Przewidywanie miesiąca 
            </Text>

            <Ionicons name="md-arrow-forward-circle-sharp" size={22} color="white" />
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
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 8,
        gap: 15
    },
    footer: {
        backgroundColor: colors.baseColor,
        width: widthScreen + 20,
        height: 50,
        marginHorizontal: -10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        gap: 20
    },
    footerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }
})

export default Page