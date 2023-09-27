import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllWorkPlace } from "../../services/workPlace";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../utils/globalStyles";

export default function Page() {
    const [selectedDate, setSelectedDate] = useState('');
    const [userData, setUserData] = useState<any>({})
    const insets = useSafeAreaInsets();


    useEffect(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('my-key');
          setUserData(jsonValue != null ? JSON.parse(jsonValue) : null)

          const res = await getAllWorkPlace(userData.authToken)
                
          console.log(await res.json())
        } catch (e) {
          // error reading value
        }
      };

      getData()
    }, [])

  return (
    <SafeAreaProvider style={[styles.container, { paddingTop: insets.top }]}>
      <DatePicker
          onSelectedChange={date => setSelectedDate(date)}
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
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center' 
  }
})