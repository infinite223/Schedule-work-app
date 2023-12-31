import { View, Text, Pressable, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors, globalStyles } from '../utils/globalStyles'
import { router, useLocalSearchParams } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker';
import { createDay, getDay } from '../services/day';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserInDay } from '../services/userInDay';
import { useDispatch, useSelector } from 'react-redux';
import { selectInvokeFunction, setInvokeFunction } from '../slices/invokeFunction';
import { setLogsInStorage } from '../utils/functions';
import Loading from '../components/Loading';
const widthScreen = Dimensions.get('screen').width

const getTimeFromTimestamp = (timestamp?: number) => {
  const newDate = new Date(Number(timestamp))
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const timeString = `${hours}:${formattedMinutes}`;

  return timeString
}

const Page = () => {
  const [selectedTime, setSelectedTime] = useState<{from: string, to: string}>({from: '12:00', to: '22:00'})
  const [showTimePicker, setShowTimePicker] = useState<number>(0)
  const params: { day: string } = useLocalSearchParams();
  const dispatch = useDispatch()
  const invokeFunction = useSelector(selectInvokeFunction)
  const [loading, setLoading] = useState(false)
  
  const options = [
    {from: '12:00', to: '22:00'},
    {from: '14:00', to: '22:00'},
    {from: '17:00', to: '22:00'},
  ]

  const saveDay = async (from: string, to: string) => {
    try {
      setLoading(true)
      const jsonValue = await AsyncStorage.getItem('my-key');
      if(jsonValue != null) {
        const res = await getDay(JSON.parse(jsonValue).authToken, params.day, JSON.parse(jsonValue).user.groupId)

        if(res.status === 200) {
          const day = await res.json()
          const newUserInDay = await createUserInDay(JSON.parse(jsonValue).authToken, from, to, day.id)
          if(newUserInDay.status === 200) {
            dispatch(setInvokeFunction(!invokeFunction))
            router.back()
          }
        }
        else {
          console.log(params.day, 'tuatjjjj')
          const newDay = await createDay(JSON.parse(jsonValue).authToken, params.day)
          
          if(newDay.status === 200) {
            const day = await newDay.json()
            const newUserInDay = await createUserInDay(JSON.parse(jsonValue).authToken, from, to, day.id)
            if(newUserInDay.status === 200) {
              dispatch(setInvokeFunction(!invokeFunction))
              router.back()
            }
          }
        }
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert('Coś poszło nie tak, spróbuj włączyć od nowa aplikacje') 
      setLogsInStorage({file: '/selectHoursModal', error: 'trycatch', date: new Date()})
    }
  }

  return (
    <Pressable style={[styles.container]} onPress={() => router.back()}>
      <Pressable onPress={() => {}} style={[styles.content, globalStyles.boxShadow]}>
        <Text style={styles.dateText}>{params.day}</Text>
        <Text style={styles.headerText}>Wybierz godziny pracy</Text>
        
        <Text style={{marginTop: 10, fontWeight: '300', fontSize: 12}}>
          Najczęściej wybierane:
        </Text>

        {!loading?<FlatList
          data={options}
          renderItem={({ item }) => 
            <TouchableOpacity 
              onPress={() => {
                // setSelectedTime({from: item.from, to: item.to})
                saveDay(item.from, item.to)
              }}
              style={styles.option}
            >
              <Text style={styles.optionText}>od {item.from}</Text> 
              <Text style={styles.optionText}>do {item.to}</Text>
            </TouchableOpacity>
          }
        />:<Loading/>}

        <Text style={{marginTop: 10, fontWeight: '300', fontSize: 12}}>
          Ustaw samemu
        </Text>
        <View style={styles.option}>
          <TouchableOpacity
            onPress={() => setShowTimePicker(1)}
          >
            <Text style={styles.optionText}>od {selectedTime.from}</Text> 
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowTimePicker(2)}
          >
            <Text style={styles.optionText}>do {selectedTime.to}</Text>
          </TouchableOpacity>
        </View>


        {showTimePicker!==0&&<DateTimePicker 
          mode='time' 
          value={new Date()} 
          onTouchEnd={() => setShowTimePicker(0)}
          onChange={(date) => {
            if(showTimePicker===1){
              setSelectedTime({...selectedTime, from: getTimeFromTimestamp(date.nativeEvent.timestamp)})
            }
            if(showTimePicker===2){
              setSelectedTime({...selectedTime, to: getTimeFromTimestamp(date.nativeEvent.timestamp)})
            }
            setShowTimePicker(0)
          }}
        />}

        <TouchableOpacity
          disabled={loading}
          style={[styles.saveButton, {opacity: loading?.4:1}]}
          onPress={() => saveDay(selectedTime.from, selectedTime.to)}
        >
          <Text style={styles.buttonText}>Zapisz</Text>
        </TouchableOpacity>
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
    content: {
      width: widthScreen - 30,
      borderRadius: 10,
      backgroundColor:'white',
      padding: 10,
      paddingVertical: 15,
      marginTop: -100,
    },
    headerText: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 17,
      marginTop: 2
    },
    dateText: {
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 12
    },
    option: {
      paddingHorizontal: 12,
      paddingVertical: 7,
      alignItems:'center',
      flexDirection:'row',
      gap: 5,
      marginVertical: 5,
      borderRadius: 5,
      borderColor: 'rgba(200, 200, 200, .6)',
      borderBottomWidth: 1
      // backgroundColor: 'rgba(200, 200, 200, .2)'
    },
    optionText: {
      fontSize: 15,
      fontWeight: '400'
    },
    saveButton: {
      paddingVertical: 7,
      borderRadius: 5,
      backgroundColor: colors.baseColor,
      alignItems:'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontWeight:'700'
    }
})

export default Page