import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal } from 'react-native-paper-dates';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWorkPlace } from "../../services/workPlace";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, globalStyles } from "../../utils/globalStyles";
import { Group, User } from "../../utils/types";
import Loading from "../../components/Loading";
import { Entypo } from "@expo/vector-icons";
import DayDetails from "../../components/DayDetails";
import { getGroupsInWorkPlace } from "../../services/group";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups, setGroups } from "../../slices/groupsSlice";
import { setWorkPlace } from "../../slices/workPlaceSlice";
import { getUser } from "../../services/user";
import { router, useNavigation } from "expo-router";

export default function Page() {
  console.log('scheddue')

    const [selectedDate, setSelectedDate] = useState('');
    const [user, setUser] = useState<User | null>(null)
    const groups = useSelector(selectGroups)
    const navigation = useNavigation()
    
    const groupName = groups.find((group: Group) => group?.id === user?.groupId)?.name
    
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: `Harmonogram ${groupName}`
      })
    }, [groups])  

    useEffect(() => {
      const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('my-key');
          if(jsonValue != null) {
            if(!JSON.parse(jsonValue).user.id) {
              router.push('/login')
            }

            const userFromDb =  await getUser(JSON.parse(jsonValue).authToken, JSON.parse(jsonValue).user?.id)
            setUser(await userFromDb.json())  
          }                
        } catch (e) {
          console.log(e)
          alert('error') 
        }
      };

      getData()
    }, [])

  if(!user) {
    return <Loading/>
  }

  return (
    <SafeAreaProvider style={[styles.container]}>
      {(user && user.workPlaceId)?
        <>
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
        </>:
        <View style={styles.errorContainer}>
          <Text style={styles.textHeader}>Aktualnie nie należysz do żadnego miejsca pracy</Text>
          <Text style={styles.textDescription}>Poproś pracodawce o dodanie 
            <Text style={{color: colors.baseColor, fontWeight:'bold'}}> {user.email} </Text>
          </Text>

        </View>
      }
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
  errorContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginHorizontal: 30,
    gap: 20
  },
  textHeader: {
    textAlign: 'center', 
    fontWeight:'700', 
    fontSize: 15
  },
  textDescription: {
    textAlign: 'center',
  }
})