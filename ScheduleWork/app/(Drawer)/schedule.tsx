import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllWorkPlace } from "../../services/workPlace";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, globalStyles } from "../../utils/globalStyles";
import { User } from "../../utils/types";
import Loading from "../../components/Loading";
import { Entypo } from "@expo/vector-icons";
import DayDetails from "../../components/DayDetails";

export default function Page() {
    const [selectedDate, setSelectedDate] = useState('');
    const [user, setUser] = useState<User | null>(null)
    const insets = useSafeAreaInsets();

    useEffect(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('my-key');
          
          if(jsonValue != null) {
            const res = await getAllWorkPlace(JSON.parse(jsonValue).authToken)
            setUser(JSON.parse(jsonValue).user)
          }
                
        } catch (e) {
          // error reading value
        }
      };

      getData()

      console.log(user)

    }, [])

  if(!user) {
    return <Loading/>
  }

  return (
    <SafeAreaProvider style={[styles.container]}>
      <DatePicker
          onSelectedChange={date => setSelectedDate(date)}
          mode="calendar"
          selected="2023/09/23"
          locale=""
          
          options={{
            textHeaderColor: 'black',
            textDefaultColor: 'black',
            selectedTextColor: '#fff',
            mainColor: colors.baseColor,
            textSecondaryColor: 'black',
            borderColor: 'rgba(122, 146, 165, 0.1)',
            textFontSize: 13
          }}
      />

      <DayDetails selectedDate={selectedDate}/>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    marginTop: -10 
  },
})