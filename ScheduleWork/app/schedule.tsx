import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
// import { SafeAreaProvider } from "react-native-safe-area-context";
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Schedule() {
    const [selectedDate, setSelectedDate] = useState('');
    const [userData, setUserData] = useState({})
    useEffect(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('my-key');
          setUserData(jsonValue != null ? JSON.parse(jsonValue) : null)

        } catch (e) {
          // error reading value
        }
      };

      console.log(userData, 'userData')
    }, [])

  return (
    // <SafeAreaProvider>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>

        <DatePicker
            onSelectedChange={date => setSelectedDate(date)}
            
        />
      </View>
    // </SafeAreaProvider>
  )
}