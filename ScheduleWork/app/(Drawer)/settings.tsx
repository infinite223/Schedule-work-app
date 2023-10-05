import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import logo from './../../assets/images/logo.png'
import { Ionicons } from "@expo/vector-icons";

const widthScreen = Dimensions.get('screen').width

export default function Page() {
    const [selectedDate, setSelectedDate] = useState('');
    const insets = useSafeAreaInsets();

    const logout = async () => {
        await AsyncStorage.removeItem('my-key');
    
        router.push('/')
      }
   
  return (
    <SafeAreaProvider style={[styles.container]}>
        <Image style={{width: 175, height: 40}} source={logo}/>

        <View style={styles.options}>
          <TouchableOpacity 
              onPress={() => {}}
              style={[styles.option]}
          >
              <Ionicons name="md-information-circle-outline" size={27}/>
              <Text style={styles.optionText}>Informacje o aplikacji</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={() => {}}
              style={[styles.option]}
          >
              <Ionicons name="notifications-outline" size={25}/>
              <Text style={styles.optionText}>Powiadomienia</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              onPress={logout}
              style={[styles.option, {backgroundColor: '#eee', marginTop: 10}]}
          >
              <Ionicons name="log-out-outline" size={25} color={'#f33'}/>
              <Text style={styles.optionText}>Wyloguj mnie</Text>
          </TouchableOpacity>
          <Text style={styles.appVersion}>Schedule work v1.0.1</Text>
        </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingBottom: 20,
    justifyContent: 'space-between' 
  },
  options: {
    gap: 5
  },
  option: {
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
    gap: 10,
    width: widthScreen - 30
  },
  optionText: {
    fontWeight: '600',
  },
  appVersion: {
    fontWeight: '400',
    fontSize: 10,
    alignSelf:'center',
    paddingVertical: 5
  }
})