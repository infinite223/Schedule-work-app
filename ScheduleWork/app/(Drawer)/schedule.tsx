import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../utils/globalStyles";
import { DateWithUsers, Group, User } from "../../utils/types";
import Loading from "../../components/Loading";
import DayDetails from "../../components/DayDetails";
import { useSelector } from "react-redux";
import { selectGroups } from "../../slices/groupsSlice";
import { getUser } from "../../services/user";
import { router, useNavigation } from "expo-router";
import CustomCalendar from "../../components/CustomCalendar";

const currentDate = new Date();

export default function Page() {
    const [selectedDate, setSelectedDate] = useState<DateWithUsers>({date: currentDate, users: []});
    const [user, setUser] = useState<User | null>(null)
    const groups = useSelector(selectGroups)
    const navigation = useNavigation()
    
    const groupName = groups.find((group: Group) => group?.id === user?.groupId)?.name
    
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: `Harmonogram ${groupName}`,
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
            if(userFromDb.status === 200){
              setUser(await userFromDb.json())  
            }
            else if(userFromDb.status === 401){
              await AsyncStorage.removeItem('my-key');
    
              router.push('/')
              
              router.push('/messageModal')
              router.setParams({ message: "Zostałeś automatycznie wylogowany", type: 'ERROR' })
            }
          }                
        } catch (e) {
          alert('Coś poszło nie tak, spróbuj włączyć od nowa aplikacje') 
        }
      };

      getData()
    }, [])

  if(!user) {
    return <Loading/>
  }

  return (
    <SafeAreaProvider style={[styles.container]}>
      {(user && user?.workPlaceId)?
        <>
          <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

          <DayDetails selectedDate={selectedDate.date}/>
        </>:
        <View style={styles.errorContainer}>
          <Text style={styles.textHeader}>Aktualnie nie należysz do żadnego miejsca pracy</Text>
          <Text style={styles.textDescription}>Poproś pracodawce o dodanie 
            <Text style={{color: colors.baseColor, fontWeight:'bold'}}> {user?.email} </Text>
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
    // marginTop: -10
    paddingTop: 10 
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