import { View, TouchableOpacity, Text, TextInput, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, globalStyles } from '../utils/globalStyles'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter, useNavigation } from 'expo-router';
import { updateUser } from '../services/user';
import { User } from '../utils/types';

const widthScreen = Dimensions.get('screen').width

const Page = () => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const getData = async () => {
      const jsonValue = await AsyncStorage.getItem('my-key');
      if(jsonValue != null){
        const data = JSON.parse(jsonValue)
        setUser(data.user)

        if(data.user.name){
          setName(data.user.name)
        }
        if(data.user.userName){
          setUserName(data.user.userName)
        }
        if(data.user.phoneNumber){
          setPhoneNumber(data.user.phoneNumber.toString())
        }
      }
    }

    getData()
  }, [])

  const hendleClickButton = async () => {
    const jsonValue = await AsyncStorage.getItem('my-key');

    if(jsonValue != null){
        const data = JSON.parse(jsonValue)
        const res = await updateUser(data.authToken, userName, phoneNumber, name, data.user.id)

        if(res.status === 200) {
          const updatedUser = await res.json()
          const newData = {
            user: updatedUser,
            authToken: data.authToken
          }
          
          await AsyncStorage.setItem('my-key', JSON.stringify(newData));

          router.push('/(Drawer)/schedule')
        }
        else {
          // logout()
        }
    }
    else {
      logout()
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('my-key');

    router.push('/')
  }
  console.log(user, 'dada')
  return (
    <SafeAreaProvider style={[styles.container, { paddingTop: insets.top }]}>
      {user?.name&&<Text style={styles.descriptionText}>
        Jescze jeden krok!
      </Text>}
      <Text style={styles.headerText}>
        Uzupełnij dane profilu 
      </Text>

      <TextInput
          placeholder='Imię'
          style={[styles.input, globalStyles.boxShadow]}
          value={name}
          onChangeText={setName}
          placeholderTextColor={'rgba(23, 23, 23, .4)'}
      />

      <TextInput
          placeholder='Nazwa użytkownika (nickname)'
          style={[styles.input, globalStyles.boxShadow]}
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor={'rgba(23, 23, 23, .4)'}
      />

      <TextInput
          placeholder='Numer telefonu (opcjonalnie)'
          style={[styles.input, globalStyles.boxShadow]}
          value={phoneNumber}
          textContentType='telephoneNumber'
          keyboardType='phone-pad'
          maxLength={9}
          onChangeText={setPhoneNumber}
          placeholderTextColor={'rgba(23, 23, 23, .4)'}
      />

      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity 
          onPress={logout}
          style={[styles.logOut, globalStyles.boxShadow]}
        >
          <Text style={{color: 'black', fontWeight: '700'}}>
              Wyloguj
          </Text>
          <MaterialIcons name="logout" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={hendleClickButton}
          style={[styles.updateButton, globalStyles.boxShadow]}
        >
          <Text style={{color: 'white', fontWeight: '700'}}>
              Aktualizuj
          </Text>
          <Ionicons name="arrow-forward-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
      backgroundColor: 'white',
      justifyContent: 'center'
    },
    descriptionText: {
      textAlign: 'center',
      marginHorizontal: 50,
      fontWeight: '300',
      maxWidth: 300,
      fontSize: 12,
      marginBottom: 20
    },
    headerText: {
      marginHorizontal: 30,
      maxWidth: 300,
      textAlign: 'center',
      fontSize: 17,
      fontWeight: '700',
      marginBottom: 20
    },
    input: {
      borderWidth: 0, 
      borderColor: '#aaa',
      backgroundColor: 'white',
      borderRadius: 50,
      paddingHorizontal: 20,
      paddingVertical: 12,
      width: widthScreen - 50,
      maxWidth: 400
    },
    updateButton: {
      borderRadius: 50, 
      backgroundColor: colors.baseColor, 
      paddingHorizontal:20, 
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems:'center',
      marginTop: 20,
      gap: 15
    },
    logOut: {
      borderRadius: 50, 
      backgroundColor: 'white', 
      paddingHorizontal:20, 
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems:'center',
      marginTop: 20,
      gap: 15
    }
})

export default Page