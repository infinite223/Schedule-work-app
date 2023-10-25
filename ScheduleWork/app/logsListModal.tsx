import { Text, View, Pressable, StyleSheet, Dimensions, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/globalStyles'
import { router } from 'expo-router'
import { Log } from '../utils/types'
import { formatDateToString } from '../utils/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const widthScreen = Dimensions.get('screen').width

const Page = () => {    
    const [logs, setLogs] = useState<Log[] | null>([])

    useEffect(() => {
        const getLogsFromStorage = async () => {
            const logsValue = await AsyncStorage.getItem('logs');

            if(logsValue != null) {
              setLogs(JSON.parse(logsValue))
            }else {
                setLogs([{date: new Date(), error: 'brak błędów', file: '/logsListModal'}])
            }
        } 

        getLogsFromStorage()
    }, [])

    const _logs = logs?new Date(logs[0]?.date):''
  console.log(_logs.toLocaleString())
  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable onPress={() => {}} style={[styles.content, globalStyles.boxShadow_light]}>
        <Text>Error logs in scheduleWork</Text>

        <FlatList
            data={logs}
            renderItem={({item}) =>  
                <View style={[styles.infoItem, globalStyles.boxShadow]}>
                    <View style={styles.name}>
                      <Text style={styles.text}>                       
                        {item?new Date(item?.date).toLocaleDateString():''} 
                      </Text>
                      <Text style={styles.text}>                       
                        {item?new Date(item?.date).getHours()+':':''}
                        {item?new Date(item?.date).getMinutes():''}
                      </Text>
                    </View>
                    <View style={{gap: 5}}>
                        <Text style={styles.contentText}>{item.error}</Text>
                        <Text style={styles.fileText}>{item.file}</Text>
                    </View>
                </View>
            }
        />
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1, 
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'rgba(1, 1, 1, .1)',
        width: widthScreen,
        height:'100%'
    },
    infoItem: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        paddingVertical: 6,
        backgroundColor: 'white'
    },
    name: {
        width: 100,
        flexDirection:'column'
    },
    text: {
      fontWeight: '500',
      fontSize: 12
    },
    contentText: {
        width: widthScreen - 165,
        color: '#d12'
    },
    fileText: {

    },
    content: {
      width: widthScreen - 20,
      borderRadius: 10,
      backgroundColor:'white',
      padding: 10,
      paddingVertical: 15,
      flex: 1,
      marginTop: 150,
      alignItems: 'center',
      gap: 10
    },
    appVersion: {
        fontWeight: '400',
        fontSize: 10,
        alignSelf:'center',
        paddingVertical: 5
      }
})

export default Page