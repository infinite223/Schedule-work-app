import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserInDay } from '../../utils/types'
import { getAllUsersInDay, removeUserInDay } from '../../services/userInDay'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import { colors, globalStyles } from '../../utils/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { usePathname } from 'expo-router/src/hooks'
import { Link, router } from 'expo-router'
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

    const removeUser = async (id: string) => {
        const jsonValue = await AsyncStorage.getItem('my-key');
        
            if(jsonValue != null ) {
                if(id){
                    const res = await removeUserInDay(JSON.parse(jsonValue).authToken, id)
                    if(res.status) {
                        setUserInDays(userInDays.filter((userIdDay) => userIdDay.id !== id))
                    }
                }
            }
    }

  return (
    <View style={styles.container}>
      <FlatList
        data={userInDays}
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, gap: 7}}
        renderItem={({ item }) => 
            <View 
                style={[styles.userInDay, globalStyles.boxShadow_light]}
            >
                <View style={{flexDirection:'row', alignItems: 'center', gap: 20}}>
                    <Text style={{fontWeight: '600'}}>{item.day?.date}</Text>
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

        <TouchableOpacity activeOpacity={.7} style={styles.footer}>
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
    text: {
        fontSize: 13
    },
    footer: {
        // backgroundColor: colors.baseColor,
        backgroundColor: '#ddd',
        // width: '100%',
        height: 45,
        marginHorizontal: 10,
        marginVertical: 15,
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