import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

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

        <TouchableOpacity 
            onPress={logout}
            style={styles.option}
        >
            <Text>Wyloguj mnie</Text>
        </TouchableOpacity>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, 
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10 
  },
  option: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: '#eee',
    width: widthScreen - 30
  }
})